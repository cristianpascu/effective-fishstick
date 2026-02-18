import styles from './SettingsPage.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  setTheme,
  toggleNotifications,
  type ThemeMode,
} from '../store/settingsSlice';

const THEMES: { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System default' },
];

export function SettingsPage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.settings?.theme ?? 'system');
  const notificationsEnabled = useAppSelector(
    (s) => s.settings?.notificationsEnabled ?? true,
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Settings</h1>
      <p className={styles.sub}>Application preferences.</p>

      <section className={styles.section}>
        <h2>Theme</h2>
        <div className={styles.options}>
          {THEMES.map(({ value, label }) => (
            <label key={value} className={styles.option}>
              <input
                type="radio"
                name="theme"
                value={value}
                checked={theme === value}
                onChange={() => dispatch(setTheme(value))}
              />
              {label}
            </label>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Notifications</h2>
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => dispatch(toggleNotifications())}
          />
          Enable notifications
        </label>
      </section>
    </div>
  );
}
