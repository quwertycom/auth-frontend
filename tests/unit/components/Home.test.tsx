import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '../../utils/test-utils';
import Home from '../../../app/page';

describe('Home component', () => {
  afterEach(() => {
    cleanup();
  });

  it('renders hello world text', () => {
    render(<Home />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      'Hello World',
    );
  });

  it('handles username reset', () => {
    render(<Home />);
    const resetButton = screen.getByRole('button', { name: 'Reset Username' });
    fireEvent.click(resetButton);
    const usernameDisplay = screen.getByRole('status');
    expect(usernameDisplay).toBeInTheDocument();
    expect(usernameDisplay.textContent).toBe('');
  });

  it('handles username set', () => {
    render(<Home />);
    const setButton = screen.getByRole('button', { name: 'Set Username' });
    fireEvent.click(setButton);
    const usernameDisplay = screen.getByRole('status');
    expect(usernameDisplay).toHaveTextContent('JohnDoe');
  });
});
