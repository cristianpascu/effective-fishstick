# R360 Application Console UI

An Nx monorepo hosting the R360 Application Console — a shell-based React application where each feature area is a self-contained **sub-app** loaded on demand via code splitting.

## Workspace structure

```txt
apps/
  app/                        # Shell application
    src/app/
      app.tsx                 # Root: Redux Provider + RouterProvider
      shell/                  # Persistent nav bar + <Outlet>
      store/                  # Shared Redux store (dynamic slice injection)
      router/                 # createBrowserRouter with lazy sub-app routes
      sub-apps/
        types.ts              # SubAppDescriptor<TSlice> interface
        dashboard/            # Dashboard sub-app
        settings/             # Settings sub-app
libs/
  shared-lib/                 # Shared React components and hooks
```

## Running the project

### Prerequisites

```sh
npm install
```

### Development server

```sh
npx nx serve app
```

Starts the Vite dev server at `http://localhost:4200` with HMR enabled.

### Production build

```sh
npx nx build app
```

Output goes to `dist/apps/app/`. Each sub-app is emitted as a separate chunk by Vite's code splitter.

### Tests

```sh
# Run all tests across the workspace
npx nx run-many -t test

# Run tests for a single project
npx nx test app
npx nx test shared-lib

# Watch mode
npx nx test app --watch
```

### Linting

```sh
npx nx run-many -t lint
```

### Explore the project graph

```sh
npx nx graph
```

## Architecture: Shell + Sub-apps

The application is split into a **shell** and any number of **sub-apps**.

| Layer | Responsibility |
| --- | --- |
| `app.tsx` | Mounts the Redux `<Provider>` and React Router `<RouterProvider>` |
| `Shell` | Renders the persistent navigation bar and an `<Outlet>` wrapped in `<Suspense>` |
| `router/router.tsx` | Declares routes; each sub-app route uses React Router's `lazy` to split the chunk |
| `store/rootReducer.ts` | `combineSlices(...).withLazyLoadedSlices()` — sub-app slices are injected at runtime |
| `sub-apps/<name>/` | Self-contained feature: own Redux slice, pages, and a `SubAppDescriptor` export |

### How sub-app loading works

1. User navigates to a route owned by a sub-app.
2. React Router calls its `lazy` loader → dynamic `import()` of the sub-app chunk.
3. The loader injects the sub-app's Redux slice: `rootReducer.inject(subApp.slice)`.
4. The loader returns `{ Component: subApp.RootComponent }` — React Router renders it inside the Shell's `<Outlet>`.

The slice state is typed as `T | undefined` until injected (via `withLazyLoadedSlices`), so selectors inside sub-app pages must handle the `undefined` case — typically with a `?? fallback`.

## Adding a new sub-app

### 1. Create the sub-app directory

```txt
apps/app/src/app/sub-apps/<name>/
  index.tsx                 # SubAppDescriptor export  ← required
  pages/
    <Name>Page.tsx
  store/
    <name>Slice.ts          # optional — omit if no Redux state needed
```

### 2. Define the Redux slice (optional)

```ts
// store/<name>Slice.ts
import { createSlice } from '@reduxjs/toolkit';

export const mySlice = createSlice({
  name: 'myFeature',
  initialState: { /* ... */ },
  reducers: { /* ... */ },
});
```

Declare it in `rootReducer.ts` so TypeScript knows the state shape is optionally present:

```ts
// store/rootReducer.ts
import type { mySlice } from '../sub-apps/<name>/store/<name>Slice';

export const rootReducer = combineSlices(appSlice).withLazyLoadedSlices<
  // add the new slice to the intersection:
  WithSlice<typeof dashboardSlice> & WithSlice<typeof settingsSlice> & WithSlice<typeof mySlice>
>();
```

### 3. Export a SubAppDescriptor

```ts
// sub-apps/<name>/index.tsx
import type { SubAppDescriptor } from '../types';
import { mySlice } from './store/<name>Slice';   // omit if no slice
import { MyPage } from './pages/MyPage';

export const MySubApp: SubAppDescriptor<typeof mySlice> = {
  id: 'my-feature',
  RootComponent: MyPage,
  slice: mySlice,            // omit if no slice
};
```

For a pure-UI sub-app with no Redux state:

```ts
export const MySubApp: SubAppDescriptor = {
  id: 'my-feature',
  RootComponent: MyPage,
};
```

### 4. Register the route

In `router/router.tsx`, add a child route inside the Shell route:

```ts
{
  path: 'my-feature/*',
  lazy: async () => {
    const { MySubApp } = await import('../sub-apps/<name>');
    if (MySubApp.slice) rootReducer.inject(MySubApp.slice);
    return { Component: MySubApp.RootComponent };
  },
},
```

### 5. Add a nav link

In `shell/Shell.tsx`, add an entry to `NAV_ITEMS`:

```ts
const NAV_ITEMS = [
  { to: '/',           label: 'Dashboard',  end: true  },
  { to: '/settings',   label: 'Settings',   end: false },
  { to: '/my-feature', label: 'My Feature', end: false }, // ← new
];
```

### Moving a sub-app to its own package

When a sub-app outgrows `apps/app/src/`, it can be promoted to a dedicated library:

```sh
npx nx g @nx/react:lib my-feature
```

Move the sub-app directory into the new library, update the dynamic import path in `router/router.tsx`, and let `nx sync` update the TypeScript project references automatically.

## Shared library (`libs/shared-lib`)

Reusable components and hooks consumed by any sub-app or the shell. Import from the package alias:

```ts
import { Button, useCounter } from '@r360/shared-lib';
```

To add new exports, add them to `libs/shared-lib/src/index.ts`.

## Nx workspace management

```sh
# Sync TypeScript project references (run after adding/removing imports)
npx nx sync

# List all available targets for a project
npx nx show project app

# Generate a new library
npx nx g @nx/react:lib mylib
```

TypeScript project references are managed automatically by the `@nx/js:typescript-sync` generator — do not edit `references` arrays in `tsconfig` files by hand.
