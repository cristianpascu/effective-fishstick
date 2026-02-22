import styles from './SettingsPage.module.css';
import { NavLink, Outlet } from 'react-router-dom';

export function SettingsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Settings</h1>
      <p className={styles.sub}>Application preferences.</p>

      <nav className={styles.subNav} aria-label="Settings pages">
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
          to="advanced"
          className={({ isActive }) =>
            isActive ? styles.subNavLinkActive : styles.subNavLink
          }
        >
          Advanced
        </NavLink>
      </nav>

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}
