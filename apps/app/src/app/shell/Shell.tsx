import styles from './Shell.module.css';
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
    <div className={styles.shell}>
      <nav className={styles.nav}>
        <span className={styles.brand}>R360 Console</span>
        <ul className={styles.navList}>
          {NAV_ITEMS.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  isActive ? styles.navLinkActive : styles.navLink
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <main className={styles.content}>
        <Suspense fallback={<div className={styles.loading}>Loading…</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
}
