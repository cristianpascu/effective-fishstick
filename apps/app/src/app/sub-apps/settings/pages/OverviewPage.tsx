import styles from './OverviewPage.module.css';
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

export function OverviewPage() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector((s) => s.settings?.theme ?? 'system');
  const notificationsEnabled = useAppSelector(
    (s) => s.settings?.notificationsEnabled ?? true,
  );

  return (
    <div>
      <h2 className={styles.heading}>Overview</h2>

      <section className={styles.section}>
        <h3>Theme</h3>
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
        <h3>Notifications</h3>
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
