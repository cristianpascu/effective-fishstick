import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { router } from './router/router';

/**
 * Application root.
 *
 * Responsibilities:
 *  - Provides the Redux store to the entire component tree.
 *  - Renders the data router (React Router v6) that mounts the shell and
 *    sub-app route trees.
 *
 * The BrowserRouter that was previously in main.tsx is replaced by
 * RouterProvider + createBrowserRouter so route loaders can inject
 * sub-app slices before first render.
 */
export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
