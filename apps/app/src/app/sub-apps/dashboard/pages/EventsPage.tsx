import styles from './EventsPage.module.css';
import { useAppSelector } from '../../../store/hooks';

export function EventsPage() {
  const widgetCount = useAppSelector((s) => s.dashboard?.widgetCount ?? 0);
  const lastRefreshed = useAppSelector(
    (s) => s.dashboard?.lastRefreshed ?? null,
  );

  return (
    <div className={styles.page}>
      <h2 className={styles.heading}>Events</h2>
      <p className={styles.sub}>Recent dashboard activity summary.</p>

      <div className={styles.card}>
        <p className={styles.event}>
          Widgets currently configured: {widgetCount}
        </p>
        <p className={styles.event}>
          Last refresh event: {lastRefreshed ?? 'No refresh event yet'}
        </p>
      </div>
    </div>
  );
}
