import type { ComponentType } from 'react';
import type { Slice } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';

/**
 * Contract every sub-app must satisfy.
 *
 * A sub-app is lazy-loaded via dynamic `import()` (code splitting). When its
 * route is first matched React Router calls the `lazy` loader, which imports
 * the sub-app module, injects its Redux slice into the store (if it has one),
 * and returns the root component to render.
 */
export interface SubAppDescriptor {
  /** Unique identifier used for navigation state and debugging. */
  id: string;

  /**
   * The root React component returned to React Router's `lazy` loader.
   * This is what gets rendered at the sub-app's mount path.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  RootComponent: ComponentType<any>;

  /**
   * Optional Redux slice.  Will be injected into the store via
   * `rootReducer.inject(slice)` the first time the sub-app is loaded.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice?: Slice<any, any, any>;

  /**
   * Optional additional React Router route objects owned by this sub-app
   * (nested routes, detail pages, etc.).
   * These are placed as children of the sub-app's root route.
   */
  routes?: RouteObject[];
}
