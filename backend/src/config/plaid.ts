import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";
import { ENV } from "./env";

let plaidClient: PlaidApi | null = null;

export const getPlaidClient = (): PlaidApi => {
  if (plaidClient) {
    return plaidClient;
  }

  const { clientId, secret, environment } = ENV.plaid;

  if (!clientId || !secret) {
    throw new Error("Plaid credentials are not configured");
  }

  const plaidEnvironment =
    PlaidEnvironments[environment as keyof typeof PlaidEnvironments];

  if (!plaidEnvironment) {
    throw new Error(`Unsupported Plaid environment: ${environment}`);
  }

  const config = new Configuration({
    basePath: plaidEnvironment,
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": clientId,
        "PLAID-SECRET": secret,
      },
    },
  });

  plaidClient = new PlaidApi(config);
  return plaidClient;
};
