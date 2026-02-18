import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

const renderWithRouter = () =>
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = renderWithRouter();
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    renderWithRouter();
    expect(
      screen.getAllByText(/Welcome @r360-applicationconsole-ui\/app/i).length > 0,
    ).toBeTruthy();
  });

  it('renders the counter demo from shared-lib', () => {
    renderWithRouter();
    expect(screen.getByText('Counter (from shared-lib)')).toBeInTheDocument();
    // initial counter value
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('increments the counter when + is clicked', async () => {
    renderWithRouter();
    await userEvent.click(screen.getByRole('button', { name: '+' }));
    expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('resets the counter when Reset is clicked', async () => {
    renderWithRouter();
    await userEvent.click(screen.getByRole('button', { name: '+' }));
    await userEvent.click(screen.getByRole('button', { name: 'Reset' }));
    expect(screen.getByText('0')).toBeInTheDocument();
  });
});
