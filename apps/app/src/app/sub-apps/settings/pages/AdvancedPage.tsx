import { useAppSelector } from '../../../store/hooks';

export function AdvancedPage() {
  const theme = useAppSelector((s) => s.settings?.theme ?? 'system');
  const notificationsEnabled = useAppSelector(
    (s) => s.settings?.notificationsEnabled ?? true,
  );

  return (
    <div className="max-w-150">
      <h2 className="mb-1 text-xl font-bold">Advanced</h2>
      <p className="mb-4 text-slate-600">Current configuration snapshot.</p>

      <div className="rounded-[10px] border border-slate-200 bg-slate-50 px-6 py-5">
        <p className="mb-2 text-slate-700">Theme mode: {theme}</p>
        <p className="m-0 text-slate-700">
          Notifications: {notificationsEnabled ? 'Enabled' : 'Disabled'}
        </p>
      </div>
    </div>
  );
}
