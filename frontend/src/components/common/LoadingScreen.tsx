export const LoadingScreen = ({ message = "Loading..." }: { message?: string }) => (
  <div className="flex min-h-screen items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4 rounded-2xl bg-white px-10 py-12 shadow-card">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-500" />
      <p className="text-base font-medium text-slate-700">{message}</p>
    </div>
  </div>
);
