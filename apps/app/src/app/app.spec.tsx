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
    // Dashboard sub-app should be active at the root route
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Dashboard' }),
      ).toBeInTheDocument(),
    );
  });

  it('should navigate to the Dashboard Events page', async () => {
    renderApp();
    const eventsLink = await screen.findByRole('link', { name: 'Events' });
    await userEvent.click(eventsLink);
    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Events' }),
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

  it('should navigate to the Settings Advanced page', async () => {
    renderApp();
    const settingsLink = await screen.findByRole('link', { name: 'Settings' });
    await userEvent.click(settingsLink);

    const advancedLink = await screen.findByRole('link', { name: 'Advanced' });
    await userEvent.click(advancedLink);

    await waitFor(() =>
      expect(
        screen.getByRole('heading', { name: 'Advanced' }),
      ).toBeInTheDocument(),
    );
  });
});
