import { NavLink, Outlet } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className="max-w-225">
      <h1 className="mb-1 text-3xl font-bold">Dashboard</h1>
      <p className="mb-4 text-slate-600">
        Welcome to the R360 Application Console.
      </p>

      <nav className="mb-5 flex gap-2" aria-label="Dashboard pages">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            `rounded-lg border px-3.5 py-2 text-sm no-underline ${
              isActive
                ? 'border-indigo-200 bg-indigo-50 text-slate-800'
                : 'border-slate-300 bg-white text-slate-700'
            }`
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="events"
          className={({ isActive }) =>
            `rounded-lg border px-3.5 py-2 text-sm no-underline ${
              isActive
                ? 'border-indigo-200 bg-indigo-50 text-slate-800'
                : 'border-slate-300 bg-white text-slate-700'
            }`
          }
        >
          Events
        </NavLink>
      </nav>

      <div className="min-h-50">
        <Outlet />
      </div>
    </div>
  );
}
