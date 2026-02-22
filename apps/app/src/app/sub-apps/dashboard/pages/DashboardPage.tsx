import styles from './DashboardPage.module.css';
import { NavLink, Outlet } from 'react-router-dom';

export function DashboardPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Dashboard</h1>
      <p className={styles.sub}>Welcome to the R360 Application Console.</p>

      <nav className={styles.subNav} aria-label="Dashboard pages">
        <NavLink
          to="."
          end
          className={({ isActive }) =>
            isActive ? styles.subNavLinkActive : styles.subNavLink
          }
        >
          Overview
        </NavLink>
        <NavLink
          to="events"
          className={({ isActive }) =>
            isActive ? styles.subNavLinkActive : styles.subNavLink
          }
        >
          Events
        </NavLink>
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
