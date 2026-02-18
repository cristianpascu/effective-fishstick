import styles from './DashboardPage.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { refreshed, setWidgetCount } from '../store/dashboardSlice';

export function DashboardPage() {
  const dispatch = useAppDispatch();
  const widgetCount = useAppSelector((s) => s.dashboard?.widgetCount ?? 0);
  const lastRefreshed = useAppSelector(
    (s) => s.dashboard?.lastRefreshed ?? null,
  );

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Dashboard</h1>
      <p className={styles.sub}>Welcome to the R360 Application Console.</p>

      <div className={styles.card}>
        <h2>Widget Count</h2>
        <p className={styles.stat}>{widgetCount}</p>
        <div className={styles.actions}>
          <button onClick={() => dispatch(setWidgetCount(widgetCount + 1))}>
            + Add widget
          </button>
          <button
            onClick={() =>
              dispatch(setWidgetCount(Math.max(0, widgetCount - 1)))
            }
          >
            − Remove widget
          </button>
        </div>
      </div>

      <div className={styles.card}>
        <h2>Last Refreshed</h2>
        <p className={styles.stat}>{lastRefreshed ?? '—'}</p>
        <button onClick={() => dispatch(refreshed())}>Refresh now</button>
      </div>
    </div>
  );
}
