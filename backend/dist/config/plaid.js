"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlaidClient = void 0;
const plaid_1 = require("plaid");
const env_1 = require("./env");
let plaidClient = null;
const getPlaidClient = () => {
    if (plaidClient) {
        return plaidClient;
    }
    const { clientId, secret, environment } = env_1.ENV.plaid;
    if (!clientId || !secret) {
        throw new Error("Plaid credentials are not configured");
    }
    const plaidEnvironment = plaid_1.PlaidEnvironments[environment];
    if (!plaidEnvironment) {
        throw new Error(`Unsupported Plaid environment: ${environment}`);
    }
    const config = new plaid_1.Configuration({
        basePath: plaidEnvironment,
        baseOptions: {
            headers: {
                "PLAID-CLIENT-ID": clientId,
                "PLAID-SECRET": secret,
            },
        },
    });
    plaidClient = new plaid_1.PlaidApi(config);
    return plaidClient;
};
exports.getPlaidClient = getPlaidClient;
//# sourceMappingURL=plaid.js.map