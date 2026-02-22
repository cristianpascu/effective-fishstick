import styles from './OverviewPage.module.css';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { refreshed, setWidgetCount } from '../store/dashboardSlice';

export function OverviewPage() {
  const dispatch = useAppDispatch();
  const widgetCount = useAppSelector((s) => s.dashboard?.widgetCount ?? 0);
  const lastRefreshed = useAppSelector(
    (s) => s.dashboard?.lastRefreshed ?? null,
  );

  return (
    <div>
      <h2 className={styles.heading}>Overview</h2>

      <div className={styles.card}>
        <h3>Widget Count</h3>
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
        <h3>Last Refreshed</h3>
        <p className={styles.stat}>{lastRefreshed ?? '—'}</p>
        <button onClick={() => dispatch(refreshed())}>Refresh now</button>
      </div>
    </div>
  );
}
