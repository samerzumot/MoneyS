"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncAllPlaidLiabilities = exports.exchangePublicToken = exports.createLinkToken = void 0;
const plaid_1 = require("plaid");
const enums_1 = require("../generated/client/enums");
const plaid_2 = require("../config/plaid");
const env_1 = require("../config/env");
const errors_1 = require("../utils/errors");
const prisma_1 = require("../utils/prisma");
const mapAccountType = (type, subtype) => {
    if (!type)
        return enums_1.DebtType.OTHER;
    if (type === "credit") {
        return enums_1.DebtType.CREDIT_CARD;
    }
    if (type === "loan") {
        if (subtype === "student")
            return enums_1.DebtType.STUDENT_LOAN;
        if (subtype === "mortgage")
            return enums_1.DebtType.MORTGAGE;
        if (subtype === "auto")
            return enums_1.DebtType.LOAN;
        return enums_1.DebtType.LOAN;
    }
    if (type === "depository") {
        return enums_1.DebtType.BNPL;
    }
    return enums_1.DebtType.OTHER;
};
const roundCurrency = (value) => (value ? Number(value.toFixed(2)) : 0);
const isCreditLiability = (liability) => "aprs" in liability;
const isStudentLiability = (liability) => "interest_rate_percentage" in liability;
const isMortgageLiability = (liability) => !("aprs" in liability) && !("interest_rate_percentage" in liability);
const parseLiabilityDetails = (liabilities, accountId) => {
    const detail = liabilities?.credit?.find((item) => item.account_id === accountId) ??
        liabilities?.student?.find((item) => item.account_id === accountId) ??
        liabilities?.mortgage?.find((item) => item.account_id === accountId);
    if (!detail) {
        return {
            interestRate: 0,
            minPayment: 0,
            dueDate: null,
        };
    }
    if (isCreditLiability(detail)) {
        const credit = detail;
        const aprList = credit.aprs ?? [];
        const aprEntry = aprList.find((item) => item.apr_type === "purchase_apr") ?? aprList[0];
        const minimumPayment = credit.minimum_payment_amount ?? credit.last_payment_amount ?? 0;
        return {
            interestRate: roundCurrency(aprEntry?.apr_percentage ?? 0),
            minPayment: roundCurrency(minimumPayment),
            dueDate: credit.next_payment_due_date ? new Date(credit.next_payment_due_date) : null,
        };
    }
    if (isStudentLiability(detail)) {
        const student = detail;
        const minimumPayment = student.minimum_payment_amount ?? 0;
        return {
            interestRate: roundCurrency(student.interest_rate_percentage ?? 0),
            minPayment: roundCurrency(minimumPayment),
            dueDate: student.next_payment_due_date ? new Date(student.next_payment_due_date) : null,
        };
    }
    if (isMortgageLiability(detail)) {
        const mortgage = detail;
        const minimumPayment = mortgage.minimum_payment_amount ?? 0;
        const aprPercentage = mortgage.interest_rate?.percentage ?? 0;
        return {
            interestRate: roundCurrency(aprPercentage),
            minPayment: roundCurrency(minimumPayment),
            dueDate: mortgage.next_payment_due_date ? new Date(mortgage.next_payment_due_date) : null,
        };
    }
    return {
        interestRate: 0,
        minPayment: 0,
        dueDate: null,
    };
};
const createLinkToken = async (userId) => {
    const plaidClient = (0, plaid_2.getPlaidClient)();
    const request = {
        client_name: "Debt & Expense Optimizer",
        language: "en",
        country_codes: [plaid_1.CountryCode.Us],
        user: {
            client_user_id: userId,
        },
        products: [plaid_1.Products.Liabilities, plaid_1.Products.Transactions],
        webhook: `${env_1.ENV.app.baseUrl ?? "http://localhost:4000"}/api/plaid/webhook`,
    };
    const response = await plaidClient.linkTokenCreate(request);
    return response.data;
};
exports.createLinkToken = createLinkToken;
const exchangePublicToken = async (userId, publicToken) => {
    const plaidClient = (0, plaid_2.getPlaidClient)();
    const exchange = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
    });
    const { access_token: accessToken, item_id: itemId } = exchange.data;
    const item = await prisma_1.prisma.plaidItem.upsert({
        where: { itemId },
        update: {
            accessToken,
            updatedAt: new Date(),
        },
        create: {
            userId,
            itemId,
            accessToken,
        },
    });
    await syncPlaidLiabilitiesForItem(userId, item.id);
    return { success: true };
};
exports.exchangePublicToken = exchangePublicToken;
const syncPlaidLiabilitiesForItem = async (userId, plaidItemId) => {
    const item = await prisma_1.prisma.plaidItem.findUnique({
        where: { id: plaidItemId },
    });
    if (!item) {
        throw new errors_1.AppError("Plaid item not found", 404);
    }
    const plaidClient = (0, plaid_2.getPlaidClient)();
    const response = await plaidClient.liabilitiesGet({
        access_token: item.accessToken,
    });
    const { accounts, liabilities } = response.data;
    for (const account of accounts) {
        const accountId = account.account_id;
        const balance = account.balances.current ??
            account.balances.available ??
            account.balances.limit ??
            0;
        const { interestRate, minPayment, dueDate } = parseLiabilityDetails(liabilities, accountId);
        const type = mapAccountType(account.type, account.subtype);
        const dueDateValue = dueDate ?? null;
        await prisma_1.prisma.debtAccount.upsert({
            where: {
                plaidAccountId: accountId,
            },
            update: {
                userId,
                plaidItemId,
                name: account.name,
                balance: roundCurrency(balance),
                interestRate,
                minPayment: minPayment || 25,
                dueDate: dueDateValue,
                lastSyncedAt: new Date(),
                type,
            },
            create: {
                userId,
                plaidItemId,
                plaidAccountId: accountId,
                name: account.name,
                balance: roundCurrency(balance),
                interestRate,
                minPayment: minPayment || 25,
                dueDate: dueDateValue,
                lastSyncedAt: new Date(),
                type,
            },
        });
    }
};
const syncAllPlaidLiabilities = async (userId) => {
    const items = await prisma_1.prisma.plaidItem.findMany({
        where: { userId },
    });
    if (items.length === 0) {
        throw new errors_1.AppError("No Plaid connections found for this user", 404);
    }
    for (const item of items) {
        await syncPlaidLiabilitiesForItem(userId, item.id);
    }
    return {
        success: true,
    };
};
exports.syncAllPlaidLiabilities = syncAllPlaidLiabilities;
//# sourceMappingURL=plaidService.js.map