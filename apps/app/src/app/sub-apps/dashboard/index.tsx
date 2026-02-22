import type { SubAppDescriptor } from '../types';
import { dashboardSlice } from './store/dashboardSlice';
import { DashboardPage } from './pages/DashboardPage';
import { OverviewPage } from './pages/OverviewPage';
import { EventsPage } from './pages/EventsPage';

/**
 * Dashboard sub-app descriptor.
 *
 * The `RootComponent` provides the sub-app shell/layout and the nested
 * `routes` define its pages (`Overview`, `Events`).
 */
export const DashboardSubApp: SubAppDescriptor<typeof dashboardSlice> = {
  id: 'dashboard',
  RootComponent: DashboardPage,
  slice: dashboardSlice,
  routes: [
    { index: true, Component: OverviewPage },
    { path: 'events', Component: EventsPage },
  ],
};
