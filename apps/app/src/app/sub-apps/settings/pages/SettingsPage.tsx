import { NavLink, Outlet } from 'react-router-dom';

export function SettingsPage() {
  return (
    <div className="max-w-150">
      <h1 className="mb-1 text-3xl font-bold">Settings</h1>
      <p className="mb-4 text-slate-600">Application preferences.</p>

      <nav className="mb-5 flex gap-2" aria-label="Settings pages">
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
          to="advanced"
          className={({ isActive }) =>
            `rounded-lg border px-3.5 py-2 text-sm no-underline ${
              isActive
                ? 'border-indigo-200 bg-indigo-50 text-slate-800'
                : 'border-slate-300 bg-white text-slate-700'
            }`
          }
        >
          Advanced
        </NavLink>
      </nav>

      <div className="min-h-55">
        <Outlet />
      </div>
    </div>
  );
}
