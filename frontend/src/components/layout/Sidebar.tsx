import {
  BanknotesIcon,
  BoltIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  HomeModernIcon,
  LifebuoyIcon,
  QueueListIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const navigation = [
  { label: "Dashboard", to: "/dashboard", icon: Squares2X2Icon },
  { label: "Accounts", to: "/accounts", icon: BanknotesIcon },
  { label: "Payoff Plan", to: "/plan", icon: BoltIcon },
  { label: "Debts", to: "/debts", icon: ChartBarIcon },
  { label: "Expenses", to: "/expenses", icon: QueueListIcon },
  { label: "Notifications", to: "/notifications", icon: HomeModernIcon },
  { label: "Settings", to: "/settings", icon: Cog6ToothIcon },
  { label: "Help", to: "/help", icon: LifebuoyIcon },
];

export const Sidebar = () => (
  <aside className="hidden w-72 shrink-0 flex-col bg-white/95 px-6 pb-10 pt-8 shadow-card backdrop-blur lg:flex">
    <div className="flex items-center gap-3 pb-10">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
        <BoltIcon className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-lg font-semibold text-slate-900">Clarity Planner</h1>
        <p className="text-xs font-medium uppercase tracking-wide text-primary-500">
          Debt & Expense Optimizer
        </p>
      </div>
    </div>
    <nav className="flex-1 space-y-2">
      {navigation.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            clsx(
              "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
              isActive
                ? "bg-primary-100 text-primary-700 shadow-inner"
                : "text-slate-500 hover:bg-slate-100 hover:text-slate-900",
            )
          }
        >
          <item.icon className="h-5 w-5" />
          {item.label}
        </NavLink>
      ))}
    </nav>
    <div className="mt-6 rounded-3xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-5 text-white shadow-lg">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-primary-100">
        Smart Suggestions
      </h2>
      <p className="mt-2 text-sm text-primary-50">
        Receive AI-powered nudges before payments are due and track how much interest you are
        saving this month.
      </p>
    </div>
  </aside>
);
