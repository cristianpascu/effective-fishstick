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
      <h2 className="mb-4 text-xl font-bold">Overview</h2>

      <div className="mb-5 rounded-[10px] border border-slate-200 bg-slate-50 px-6 py-5">
        <h3 className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-700">
          Widget Count
        </h3>
        <p className="mb-4 text-3xl font-bold text-slate-900">{widgetCount}</p>
        <div className="flex gap-2">
          <button
            className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm transition-colors hover:bg-slate-100"
            onClick={() => dispatch(setWidgetCount(widgetCount + 1))}
          >
            + Add widget
          </button>
          <button
            className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm transition-colors hover:bg-slate-100"
            onClick={() =>
              dispatch(setWidgetCount(Math.max(0, widgetCount - 1)))
            }
          >
            − Remove widget
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-[10px] border border-slate-200 bg-slate-50 px-6 py-5">
        <h3 className="mb-3 text-base font-semibold uppercase tracking-wide text-slate-700">
          Last Refreshed
        </h3>
        <p className="mb-4 text-3xl font-bold text-slate-900">
          {lastRefreshed ?? '—'}
        </p>
        <button
          className="cursor-pointer rounded-md border border-slate-300 bg-white px-4 py-1.5 text-sm transition-colors hover:bg-slate-100"
          onClick={() => dispatch(refreshed())}
        >
          Refresh now
        </button>
      </div>
    </div>
  );
}
