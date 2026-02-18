import { combineSlices, WithSlice } from '@reduxjs/toolkit';
import { appSlice } from './appSlice';
// Type-only imports — erased at compile time, no runtime chunk impact.
import type { dashboardSlice } from '../sub-apps/dashboard/store/dashboardSlice';
import type { settingsSlice } from '../sub-apps/settings/store/settingsSlice';

/**
 * Root reducer built with combineSlices.
 *
 * Sub-apps inject their own slices at runtime via `rootReducer.inject(slice)`
 * inside the React Router lazy loaders (see `router/router.tsx`).
 *
 * `withLazyLoadedSlices` widens each declared slice's state to `T | undefined`
 * so TypeScript enforces null-checks in selectors before a sub-app loads.
 */
export const rootReducer = combineSlices(appSlice).withLazyLoadedSlices<
  WithSlice<typeof dashboardSlice> & WithSlice<typeof settingsSlice>
>();
