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
      <h2 className="mb-4 text-xl font-bold">Overview</h2>

      <section className="mb-5 rounded-[10px] border border-slate-200 bg-slate-50 px-6 py-5">
        <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-slate-700">
          Theme
        </h3>
        <div className="flex flex-col gap-2">
          {THEMES.map(({ value, label }) => (
            <label
              key={value}
              className="flex cursor-pointer items-center gap-2 text-sm"
            >
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

      <section className="mb-5 rounded-[10px] border border-slate-200 bg-slate-50 px-6 py-5">
        <h3 className="mb-4 text-base font-semibold uppercase tracking-wide text-slate-700">
          Notifications
        </h3>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
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
