import { createBrowserRouter } from 'react-router-dom';
import { Shell } from '../shell/Shell';
import { rootReducer } from '../store/rootReducer';
import { DashboardSubApp } from '../sub-apps/dashboard';
import { SettingsSubApp } from '../sub-apps/settings';

const SUB_APP_ROUTES = [
  { path: undefined, descriptor: DashboardSubApp },
  { path: 'settings/*', descriptor: SettingsSubApp },
] as const;

/**
 * Application router.
 *
 * Sub-app routes are declared by each descriptor and registered under the
 * shared shell. Before rendering a sub-app route, its Redux slice (if any)
 * is injected into the shared store via the route loader.
 *
 * Adding a new sub-app:
 *  1. Create `src/app/sub-apps/<name>/index.tsx` exporting a `SubAppDescriptor`.
 *  2. Add its path + descriptor to `SUB_APP_ROUTES`.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: SUB_APP_ROUTES.map(({ path, descriptor }) => ({
      ...(path !== undefined ? { path } : {}),
      loader: () => {
        if (descriptor.slice) rootReducer.inject(descriptor.slice);
        return null;
      },
      Component: descriptor.RootComponent,
      children: descriptor.routes,
    })),
  },
]);
