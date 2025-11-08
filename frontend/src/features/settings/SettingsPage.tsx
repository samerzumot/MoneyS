import { useCurrentUser } from "./api/useCurrentUser";
import { LoadingScreen } from "../../components/common/LoadingScreen";
import { useAuth } from "../../lib/authContext";

export const SettingsPage = () => {
  const { user, signOut, devMode } = useAuth();
  const { data: currentUser, isLoading } = useCurrentUser();

  if (isLoading && !currentUser) {
    return <LoadingScreen message="Loading settings..." />;
  }

  return (
    <div className="space-y-6">
      <section className="rounded-3xl bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Profile</h2>
        <p className="text-sm text-slate-500">
          Manage account details and authentication preferences.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Name</p>
            <p className="text-sm font-semibold text-slate-900">{user?.displayName ?? "User"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Email</p>
            <p className="text-sm font-semibold text-slate-900">{user?.email ?? "dev@example.com"}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">Authentication</p>
            <p className="text-sm font-semibold text-slate-900">
              {devMode ? "Sandbox Mode" : "Firebase · Google Sign-in"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={signOut}
          className="mt-6 rounded-2xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100"
        >
          Sign out
        </button>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Notifications</h2>
        <p className="text-sm text-slate-500">
          Configure how you want to receive reminders and plan updates.
        </p>
        <div className="mt-6 space-y-4">
          <ToggleRow
            label="Email reminders"
            enabled={currentUser?.config.notifications.emailEnabled ?? false}
            hint="Receive upcoming payment and expense alerts via email."
          />
          <ToggleRow
            label="In-app nudges"
            enabled
            hint="These are always on so you never miss a due date."
          />
          <ToggleRow
            label="AI plan updates"
            enabled={currentUser?.config.ai.enabled ?? false}
            hint="Get notified when the AI payoff plan identifies a better repayment route."
          />
        </div>
      </section>
    </div>
  );
};

const ToggleRow = ({
  label,
  hint,
  enabled,
}: {
  label: string;
  hint: string;
  enabled: boolean;
}) => (
  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 px-4 py-3">
    <div>
      <p className="text-sm font-semibold text-slate-900">{label}</p>
      <p className="text-xs text-slate-500">{hint}</p>
    </div>
    <div
      className={`flex h-6 w-11 items-center rounded-full p-1 transition ${
        enabled ? "bg-primary-500" : "bg-slate-300"
      }`}
    >
      <span
        className={`block h-4 w-4 rounded-full bg-white shadow transition ${
          enabled ? "translate-x-5" : ""
        }`}
      />
    </div>
  </div>
);
