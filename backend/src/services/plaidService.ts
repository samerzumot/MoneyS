import {
  CountryCode,
  LinkTokenCreateRequest,
  LiabilitiesGetResponse,
  Products,
} from "plaid";
import { DebtType } from "../generated/client/enums";
import { getPlaidClient } from "../config/plaid";
import { ENV } from "../config/env";
import { AppError } from "../utils/errors";
import { prisma } from "../utils/prisma";

const mapAccountType = (type?: string | null, subtype?: string | null): DebtType => {
  if (!type) return DebtType.OTHER;

  if (type === "credit") {
    return DebtType.CREDIT_CARD;
  }

  if (type === "loan") {
    if (subtype === "student") return DebtType.STUDENT_LOAN;
    if (subtype === "mortgage") return DebtType.MORTGAGE;
    if (subtype === "auto") return DebtType.LOAN;
    return DebtType.LOAN;
  }

  if (type === "depository") {
    return DebtType.BNPL;
  }

  return DebtType.OTHER;
};

const roundCurrency = (value?: number | null) => (value ? Number(value.toFixed(2)) : 0);

type CreditLiability = NonNullable<LiabilitiesGetResponse["liabilities"]["credit"]>[number];
type StudentLiability = NonNullable<LiabilitiesGetResponse["liabilities"]["student"]>[number];
type MortgageLiability = NonNullable<LiabilitiesGetResponse["liabilities"]["mortgage"]>[number];
type AnyLiability = CreditLiability | StudentLiability | MortgageLiability;

const isCreditLiability = (liability: AnyLiability): liability is CreditLiability =>
  "aprs" in liability;

const isStudentLiability = (liability: AnyLiability): liability is StudentLiability =>
  "interest_rate_percentage" in liability;

const isMortgageLiability = (liability: AnyLiability): liability is MortgageLiability =>
  !("aprs" in liability) && !("interest_rate_percentage" in liability);

const parseLiabilityDetails = (
  liabilities: LiabilitiesGetResponse["liabilities"],
  accountId: string,
) => {
  const detail: AnyLiability | undefined =
    liabilities?.credit?.find((item) => item.account_id === accountId) ??
    liabilities?.student?.find((item) => item.account_id === accountId) ??
    liabilities?.mortgage?.find((item) => item.account_id === accountId);

  if (!detail) {
    return {
      interestRate: 0,
      minPayment: 0,
      dueDate: null as Date | null,
    };
  }

  if (isCreditLiability(detail)) {
    const credit = detail as CreditLiability;
    const aprList = credit.aprs ?? [];
    const aprEntry =
      aprList.find((item) => item.apr_type === "purchase_apr") ?? aprList[0];
    const minimumPayment = credit.minimum_payment_amount ?? credit.last_payment_amount ?? 0;

    return {
      interestRate: roundCurrency(aprEntry?.apr_percentage ?? 0),
      minPayment: roundCurrency(minimumPayment),
      dueDate: credit.next_payment_due_date ? new Date(credit.next_payment_due_date) : null,
    };
  }

  if (isStudentLiability(detail)) {
    const student = detail as StudentLiability;
    const minimumPayment = student.minimum_payment_amount ?? 0;

    return {
      interestRate: roundCurrency(student.interest_rate_percentage ?? 0),
      minPayment: roundCurrency(minimumPayment),
      dueDate: student.next_payment_due_date ? new Date(student.next_payment_due_date) : null,
    };
  }

  if (isMortgageLiability(detail)) {
    const mortgage = detail as MortgageLiability;
    const minimumPayment =
      (mortgage as { minimum_payment_amount?: number }).minimum_payment_amount ?? 0;
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
    dueDate: null as Date | null,
  };
};

export const createLinkToken = async (userId: string) => {
  const plaidClient = getPlaidClient();

  const request: LinkTokenCreateRequest = {
    client_name: "Debt & Expense Optimizer",
    language: "en",
    country_codes: [CountryCode.Us],
    user: {
      client_user_id: userId,
    },
    products: [Products.Liabilities, Products.Transactions],
    webhook: `${ENV.app.baseUrl ?? "http://localhost:4000"}/api/plaid/webhook`,
  };

  const response = await plaidClient.linkTokenCreate(request);
  return response.data;
};

export const exchangePublicToken = async (userId: string, publicToken: string) => {
  const plaidClient = getPlaidClient();

  const exchange = await plaidClient.itemPublicTokenExchange({
    public_token: publicToken,
  });

  const { access_token: accessToken, item_id: itemId } = exchange.data;

  const item = await prisma.plaidItem.upsert({
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

const syncPlaidLiabilitiesForItem = async (userId: string, plaidItemId: string) => {
  const item = await prisma.plaidItem.findUnique({
    where: { id: plaidItemId },
  });

  if (!item) {
    throw new AppError("Plaid item not found", 404);
  }

  const plaidClient = getPlaidClient();
  const response = await plaidClient.liabilitiesGet({
    access_token: item.accessToken,
  });

  const { accounts, liabilities } = response.data;

  for (const account of accounts) {
    const accountId = account.account_id;
    const balance =
      account.balances.current ??
      account.balances.available ??
      account.balances.limit ??
      0;

    const { interestRate, minPayment, dueDate } = parseLiabilityDetails(liabilities, accountId);
    const type = mapAccountType(account.type, account.subtype);
    const dueDateValue = dueDate ?? null;

    await prisma.debtAccount.upsert({
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

export const syncAllPlaidLiabilities = async (userId: string) => {
  const items = await prisma.plaidItem.findMany({
    where: { userId },
  });

  if (items.length === 0) {
    throw new AppError("No Plaid connections found for this user", 404);
  }

  for (const item of items) {
    await syncPlaidLiabilitiesForItem(userId, item.id);
  }

  return {
    success: true,
  };
};
