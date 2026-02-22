import type { SubAppDescriptor } from '../types';
import { settingsSlice } from './store/settingsSlice';
import { SettingsPage } from './pages/SettingsPage';
import { OverviewPage } from './pages/OverviewPage';
import { AdvancedPage } from './pages/AdvancedPage';

/**
 * Settings sub-app descriptor.
 *
 * The `RootComponent` provides the sub-app shell/layout and the nested
 * `routes` define its pages (`Overview`, `Advanced`).
 */
export const SettingsSubApp: SubAppDescriptor<typeof settingsSlice> = {
  id: 'settings',
  RootComponent: SettingsPage,
  slice: settingsSlice,
  routes: [
    { index: true, Component: OverviewPage },
    { path: 'advanced', Component: AdvancedPage },
  ],
};
