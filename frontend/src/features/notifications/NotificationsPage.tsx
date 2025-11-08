import dayjs from "dayjs";
import { useNotifications } from "./api/useNotifications";
import { LoadingScreen } from "../../components/common/LoadingScreen";

export const NotificationsPage = () => {
  const { data: notifications, isLoading } = useNotifications();

  if (isLoading || !notifications) {
    return <LoadingScreen message="Loading notifications..." />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <h2 className="text-lg font-semibold text-slate-900">Upcoming reminders</h2>
        <p className="text-sm text-slate-500">
          Track automated alerts for debt payments and recurring expenses.
        </p>
      </div>
      <div className="grid gap-4">
        {notifications.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
            No notifications queued. Add expenses and regenerate your payoff plan to receive
            proactive reminders.
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{notification.message}</p>
                  <p className="text-xs text-slate-500">
                    Channel: {notification.channel} · Type: {notification.type.replace("_", " ")}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-wide text-slate-500">Scheduled</p>
                  <p className="text-sm font-semibold text-slate-900">
                    {dayjs(notification.sendAt).format("MMM D, h:mm A")}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
