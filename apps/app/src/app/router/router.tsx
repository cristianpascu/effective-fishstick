import { createBrowserRouter } from 'react-router-dom';
import { Shell } from '../shell/Shell';
import { rootReducer } from '../store/rootReducer';

/**
 * Application router.
 *
 * Each sub-app is split into its own chunk via React Router's `lazy` loader.
 * The loader dynamically imports the sub-app module, injects its Redux slice
 * into the shared store (so state is ready before first render), then returns
 * the root component.
 *
 * Adding a new sub-app:
 *  1. Create `src/app/sub-apps/<name>/index.tsx` exporting a `SubAppDescriptor`.
 *  2. Add a lazy route entry below pointing to that module.
 */
export const router = createBrowserRouter([
  {
    path: '/',
    element: <Shell />,
    children: [
      {
        index: true,
        lazy: async () => {
          const { DashboardSubApp } = await import('../sub-apps/dashboard');
          if (DashboardSubApp.slice) rootReducer.inject(DashboardSubApp.slice);
          return { Component: DashboardSubApp.RootComponent };
        },
      },
      {
        path: 'settings/*',
        lazy: async () => {
          const { SettingsSubApp } = await import('../sub-apps/settings');
          if (SettingsSubApp.slice) rootReducer.inject(SettingsSubApp.slice);
          return { Component: SettingsSubApp.RootComponent };
        },
      },
    ],
  },
]);
