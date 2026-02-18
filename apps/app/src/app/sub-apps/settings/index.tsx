import type { SubAppDescriptor } from '../types';
import { settingsSlice } from './store/settingsSlice';
import { SettingsPage } from './pages/SettingsPage';

/**
 * Settings sub-app descriptor.
 *
 * Loaded lazily via React Router's `lazy` mechanism in `router/router.tsx`.
 * On first load the `settingsSlice` is injected into the shared Redux store.
 */
export const SettingsSubApp: SubAppDescriptor<typeof settingsSlice> = {
  id: 'settings',
  RootComponent: SettingsPage,
  slice: settingsSlice,
};
