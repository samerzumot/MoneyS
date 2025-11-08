import {
  BellAlertIcon,
  ArrowRightStartOnRectangleIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../lib/authContext";
import { useNotifications } from "../../features/notifications/api/useNotifications";

export const Header = () => {
  const { user, signOut, devMode } = useAuth();
  const { data: notifications } = useNotifications();

  const pendingCount =
    notifications?.filter((notification) => notification.type !== "PLAN_UPDATE").length ?? 0;

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-200 bg-white/80 px-6 backdrop-blur">
      <div>
        <p className="text-xs uppercase tracking-widest text-slate-500">
          {dayjs().format("dddd, MMM D")}
        </p>
        <h2 className="text-xl font-semibold text-slate-900">
          Welcome back, {user?.displayName ?? "there"}!
        </h2>
      </div>
      <div className="flex items-center gap-4">
        {devMode ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
            <SparklesIcon className="h-4 w-4 text-primary-500" />
            Sandbox Mode
          </span>
        ) : null}
        <button
          type="button"
          className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 transition hover:border-primary-200 hover:text-primary-600"
          title="In-app notifications"
        >
          <BellAlertIcon className="h-5 w-5" />
          {pendingCount > 0 ? (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-danger px-1 text-xs font-semibold text-white">
              {pendingCount}
            </span>
          ) : null}
        </button>
        <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
            {user?.displayName?.[0] ?? "U"}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-slate-900">{user?.displayName ?? "User"}</p>
            <p className="text-xs text-slate-500">{user?.email ?? "dev@example.com"}</p>
          </div>
          <button
            type="button"
            onClick={signOut}
            className="inline-flex items-center justify-center rounded-xl bg-slate-100 p-2 text-slate-500 transition hover:bg-primary-100 hover:text-primary-600"
            title="Sign out"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      <ToastContainer position="top-right" theme="light" />
    </header>
  );
};
