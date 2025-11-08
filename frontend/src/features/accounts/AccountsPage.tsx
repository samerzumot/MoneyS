import { useCallback, useEffect, useState } from "react";
import {
  usePlaidLink,
  type PlaidLinkOnExit,
  type PlaidLinkOnSuccess,
} from "react-plaid-link";
import { BanknotesIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import {
  fetchPlaidLinkToken,
  useExchangePlaidToken,
  useSyncPlaidLiabilities,
} from "./api/usePlaid";
import { useDebts } from "../debts/api/useDebts";
import { useAuth } from "../../lib/authContext";

export const AccountsPage = () => {
  const { devMode } = useAuth();
  const { data: debts } = useDebts();
  const exchangeToken = useExchangePlaidToken();
  const sync = useSyncPlaidLiabilities();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [linkError, setLinkError] = useState<string | null>(null);

  useEffect(() => {
    if (devMode) return;
    const createLinkToken = async () => {
      try {
        const tokenResponse = await fetchPlaidLinkToken();
        setLinkToken(tokenResponse.link_token);
      } catch (error) {
        console.error("Failed to create Plaid link token", error);
        setLinkError(
          "Unable to initialize Plaid Link. Check your backend credentials.",
        );
      }
    };
    createLinkToken();
  }, [devMode]);

  const handleSuccess = useCallback<PlaidLinkOnSuccess>(
    async (publicToken) => {
      setLinkError(null);
      await exchangeToken.mutateAsync(publicToken);
      await sync.mutateAsync();
    },
    [exchangeToken, sync],
  );

  const handleExit = useCallback<PlaidLinkOnExit>((error) => {
    if (error) {
      setLinkError("Plaid Link exited before completion.");
    }
  }, []);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
              <BanknotesIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Link your accounts
              </h2>
              <p className="text-sm text-slate-500">
                Securely connect credit cards, loans, and other liabilities via
                Plaid so balances, interest rates, and due dates stay current
                automatically.
              </p>
            </div>
          </div>
          {devMode ? (
            <button
              type="button"
              onClick={() => sync.mutate()}
              className="mt-6 w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-500"
            >
              Simulate Plaid Sync
            </button>
          ) : linkToken ? (
            <PlaidLinkButton
              token={linkToken}
              onSuccess={handleSuccess}
              onExit={handleExit}
            />
          ) : (
            <button
              type="button"
              disabled
              className="mt-6 w-full rounded-2xl bg-primary-300 py-3 text-sm font-semibold text-white"
            >
              Preparing Plaid Link...
            </button>
          )}
          {linkError ? (
            <p className="mt-3 text-xs text-danger">{linkError}</p>
          ) : null}
          <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
            <p>
              We never see or store your credentials. Plaid provides read-only
              access to balances, minimum payments, and due dates. You can
              disconnect anytime.
            </p>
          </div>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900">
                Connected liabilities
              </h2>
              <p className="text-sm text-slate-500">
                {debts?.length ?? 0} accounts syncing automatically.
              </p>
            </div>
            <button
              type="button"
              onClick={() => sync.mutate()}
              className="inline-flex items-center gap-2 rounded-2xl border border-primary-200 bg-primary-50 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary-600 transition hover:border-primary-300 hover:bg-primary-100"
            >
              <ArrowPathIcon className="h-4 w-4" />
              Sync now
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {debts && debts.length > 0 ? (
              debts.map((debt) => (
                <div
                  key={debt.id}
                  className="rounded-2xl border border-slate-200 p-4"
                >
                  <p className="text-sm font-semibold text-slate-900">
                    {debt.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {debt.type.replace("_", " ")} · Balance{" "}
                    {formatCurrency(debt.balance)} · Min{" "}
                    {formatCurrency(debt.minPayment)}
                  </p>
                </div>
              ))
            ) : (
              <p className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
                No synced accounts yet. Connect via Plaid or add manual debts to
                populate your plan.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

type PlaidLinkButtonProps = {
  token: string;
  onSuccess: PlaidLinkOnSuccess;
  onExit?: PlaidLinkOnExit;
};

const PlaidLinkButton = ({
  token,
  onSuccess,
  onExit,
}: PlaidLinkButtonProps) => {
  const { open, ready } = usePlaidLink({ token, onSuccess, onExit });
  return (
    <button
      type="button"
      onClick={() => open()}
      disabled={!ready}
      className="mt-6 w-full rounded-2xl bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-500 disabled:cursor-not-allowed disabled:bg-primary-300"
    >
      Connect with Plaid
    </button>
  );
};

const formatCurrency = (value: number) =>
  `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
