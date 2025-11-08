import type { ReactNode } from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { useAuth, isFirebaseConfigured } from "../../lib/authContext";
import { LoadingScreen } from "../../components/common/LoadingScreen";

export const AuthGate = ({ children }: { children: ReactNode }) => {
  const { user, loading, devMode, signInWithGoogle } = useAuth();

  if (loading) {
    return <LoadingScreen message="Preparing your dashboard..." />;
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 via-white to-accent-50 px-4">
        <div className="max-w-lg rounded-3xl bg-white p-10 shadow-card">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome to Clarity Planner</h1>
          <p className="mt-4 text-slate-600">
            Connect your accounts and let our AI-powered planner build the optimal path to debt
            freedom while keeping your essential expenses covered.
          </p>
          <button
            type="button"
            onClick={signInWithGoogle}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary-600 px-6 py-3 font-medium text-white shadow-lg transition hover:bg-primary-500"
          >
            <ArrowRightStartOnRectangleIcon className="h-5 w-5" />
            {isFirebaseConfigured() ? "Continue with Google" : "Continue"}
          </button>
          {devMode ? (
            <p className="mt-6 text-sm text-slate-500">
              Firebase credentials are not configured. You are using developer mode with a sandbox
              user. Update <code>.env</code> to enable full authentication.
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
