import { createBrowserRouter } from 'react-router-dom';
import { Shell } from '../shell/Shell';
import type { RouteObject } from 'react-router-dom';
import { createSubAppRoute, makeCachedLoader } from './router-utils';

const loadDashboardSubApp = makeCachedLoader(() =>
  import('../sub-apps/dashboard').then((m) => m.DashboardSubApp),
);

const loadSettingsSubApp = makeCachedLoader(() =>
  import('../sub-apps/settings').then((m) => m.SettingsSubApp),
);

const SUB_APP_ROUTES: RouteObject[] = [
  createSubAppRoute({
    descriptor: loadDashboardSubApp,
  }),
  createSubAppRoute({
    path: 'settings/*',
    descriptor: loadSettingsSubApp,
  }),
];

/**
 * Application router.
 *
 * Sub-app routes are declared by each descriptor and registered under the
 * shared shell. Before rendering a sub-app route, its Redux slice (if any)
 * is injected into the shared store via the route loader.
 *
 * Sub-apps and their pages are lazy-loaded via dynamic import() for
 * code splitting.
 *
 * Adding a new sub-app:
 *  1. Create `src/app/sub-apps/<name>/index.tsx` exporting a `SubAppDescriptor`.
 *  2. Add its route entry using `createSubAppRoute` in `SUB_APP_ROUTES`.
 */

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: SUB_APP_ROUTES,
  },
]);
