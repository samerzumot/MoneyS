import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthGate } from "./features/auth/AuthGate";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./features/dashboard/DashboardPage";
import { DebtsPage } from "./features/debts/DebtsPage";
import { ExpensesPage } from "./features/expenses/ExpensesPage";
import { PlanPage } from "./features/plan/PlanPage";
import { AccountsPage } from "./features/accounts/AccountsPage";
import { NotificationsPage } from "./features/notifications/NotificationsPage";
import { SettingsPage } from "./features/settings/SettingsPage";
import { HelpPage } from "./features/onboarding/HelpPage";

const App = () => (
  <BrowserRouter>
    <AuthGate>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/debts" element={<DebtsPage />} />
          <Route path="/expenses" element={<ExpensesPage />} />
          <Route path="/plan" element={<PlanPage />} />
          <Route path="/accounts" element={<AccountsPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </AuthGate>
  </BrowserRouter>
);

export default App;
