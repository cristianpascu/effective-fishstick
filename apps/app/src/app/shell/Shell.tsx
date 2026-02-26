import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', end: true },
  { to: '/settings', label: 'Settings', end: false },
];

/** Main application shell — provides the persistent nav bar and renders the
 *  active sub-app inside <Outlet />. Sub-apps are wrapped in <Suspense> so
 *  the lazy chunk can load without crashing the shell. */
export function Shell() {
  return (
    <div className="flex min-h-screen flex-col">
      <nav className="flex h-14 items-center gap-8 bg-slate-900 px-6 text-slate-200">
        <span className="whitespace-nowrap text-lg font-bold tracking-wide text-white">
          Light Speed
        </span>
        <ul className="m-0 flex list-none gap-1 p-0">
          {NAV_ITEMS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `rounded-md px-3.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-white/15 font-semibold text-white'
                      : 'text-slate-300 hover:bg-white/8 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className="flex-1 p-8">
        <Suspense
          fallback={<div className="p-8 text-sm text-slate-500">Loading…</div>}
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
