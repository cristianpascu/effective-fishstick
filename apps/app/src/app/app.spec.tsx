import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './app';

// App owns its own Provider + RouterProvider — no wrapper needed.
const renderApp = () => render(<App />);

describe('App', () => {
  it('should render the shell navigation', async () => {
    renderApp();
    // Wait for the shell to paint (Router + Provider initialize synchronously)
    expect(await screen.findByText('R360 Console')).toBeInTheDocument();
  });

  it('should show navigation links', async () => {
    renderApp();
    expect(
      await screen.findByRole('link', { name: 'Dashboard' }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: 'Settings' }),
    ).toBeInTheDocument();
  });

  it('should lazy-load and display the Dashboard sub-app on the root route', async () => {
    renderApp();
    // The index route lazy-imports the Dashboard chunk
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Dashboard' }),
      ).toBeInTheDocument(),
    );
  });

  it('should navigate to the Settings sub-app', async () => {
    renderApp();
    const settingsLink = await screen.findByRole('link', { name: 'Settings' });
    await userEvent.click(settingsLink);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Settings' }),
      ).toBeInTheDocument(),
    );
  });
});
