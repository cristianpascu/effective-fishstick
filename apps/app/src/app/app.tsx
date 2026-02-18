import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { store } from './store';
import { router } from './router/router';

/**
 * Application root.
 *
 * Responsibilities:
 *  - Provides the Redux store to the entire component tree.
 *  - Renders the data router (React Router v6) which handles code-split sub-apps.
 *
 * The BrowserRouter that was previously in main.tsx is replaced by
 * RouterProvider + createBrowserRouter so that lazy route loaders (which
 * inject sub-app slices before first render) work correctly.
 */
export function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
