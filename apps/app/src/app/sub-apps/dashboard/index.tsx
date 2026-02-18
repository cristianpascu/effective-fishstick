import type { SubAppDescriptor } from '../types';
import { dashboardSlice } from './store/dashboardSlice';
import { DashboardPage } from './pages/DashboardPage';

/**
 * Dashboard sub-app descriptor.
 *
 * Loaded lazily via React Router's `lazy` mechanism in `router/router.tsx`.
 * On first load the `dashboardSlice` is injected into the shared Redux store.
 */
export const DashboardSubApp: SubAppDescriptor = {
  id: 'dashboard',
  RootComponent: DashboardPage,
  slice: dashboardSlice,
};
