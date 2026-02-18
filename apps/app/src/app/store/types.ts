import type { store } from './index';
import type { rootReducer } from './rootReducer';

/** Redux root state — automatically infers optional slices injected by sub-apps. */
export type RootState = ReturnType<typeof rootReducer>;

/** Typed dispatch for the application store. */
export type AppDispatch = typeof store.dispatch;
