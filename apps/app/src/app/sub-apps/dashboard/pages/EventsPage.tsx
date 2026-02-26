import { useAppSelector } from '../../../store/hooks';

export function EventsPage() {
  const widgetCount = useAppSelector((s) => s.dashboard?.widgetCount ?? 0);
  const lastRefreshed = useAppSelector(
    (s) => s.dashboard?.lastRefreshed ?? null,
  );

  return (
    <div className="max-w-225">
      <h2 className="mb-1 text-xl font-bold">Events</h2>
      <p className="mb-4 text-slate-600">Recent dashboard activity summary.</p>

      <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-6 py-5">
        <p className="mb-2 text-slate-700">
          Widgets currently configured: {widgetCount}
        </p>
        <p className="m-0 text-slate-700">
          Last refresh event: {lastRefreshed ?? 'No refresh event yet'}
        </p>
      </div>
    </div>
  );
}
