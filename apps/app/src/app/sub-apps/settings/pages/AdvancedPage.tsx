import styles from './AdvancedPage.module.css';
import { useAppSelector } from '../../../store/hooks';

export function AdvancedPage() {
  const theme = useAppSelector((s) => s.settings?.theme ?? 'system');
  const notificationsEnabled = useAppSelector(
    (s) => s.settings?.notificationsEnabled ?? true,
  );

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Advanced</h2>
      <p className={styles.sub}>Current configuration snapshot.</p>

      <div className={styles.card}>
        <p className={styles.item}>Theme mode: {theme}</p>
        <p className={styles.item}>
          Notifications: {notificationsEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    </div>
  );
}
