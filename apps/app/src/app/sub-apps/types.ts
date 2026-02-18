import type { ComponentType } from 'react';
import type { Slice } from '@reduxjs/toolkit';
import type { RouteObject } from 'react-router-dom';

/**
 * Contract every sub-app must satisfy.
 *
 * Generic over the Redux slice it owns:
 *  - `SubAppDescriptor`              — no slice (pure-UI sub-app)
 *  - `SubAppDescriptor<typeof mySlice>` — owns `mySlice`; full state, reducer,
 *    name and selector types are preserved via `typeof`.
 *
 * A sub-app is lazy-loaded via dynamic `import()` (code splitting). When its
 * route is first matched React Router calls the `lazy` loader, which imports
 * the sub-app module, injects its slice into the store (if present), and
 * returns the root component to render.
 */
export interface SubAppDescriptor<
  TSlice extends Slice | undefined = undefined,
> {
  /** Unique identifier used for navigation state and debugging. */
  id: string;

  /**
   * The root React component returned to React Router's `lazy` loader.
   * This is what gets rendered at the sub-app's mount path.
   */
  RootComponent: ComponentType;

  /**
   * Optional Redux slice injected into the store on first load.
   * Pass `typeof mySlice` as the type argument to preserve the full inferred
   * slice type (state shape, action creators, selectors).
   */
  slice?: TSlice;

  /**
   * Optional additional React Router route objects owned by this sub-app
   * (nested routes, detail pages, etc.).
   * These are placed as children of the sub-app's root route.
   */
  routes?: RouteObject[];
}
