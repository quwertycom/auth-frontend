import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../utils/test-utils';
import Home from '../../app/page';
import type { RootState } from '../../app/store/store';

describe('Authentication Flow', () => {
  it('should handle the complete auth flow', async () => {
    const { store: testStore } = render(<Home />);

    // Check initial state
    const state = testStore.getState() as RootState;
    expect(state.auth.username).toBeNull();

    // Set username
    const setButton = screen.getByRole('button', { name: 'Set Username' });
    fireEvent.click(setButton);

    // Verify username is set in both store and UI
    const updatedState = testStore.getState() as RootState;
    expect(updatedState.auth.username).toBe('JohnDoe');
    expect(screen.getByRole('status')).toHaveTextContent('JohnDoe');

    // Reset username
    const resetButton = screen.getByRole('button', { name: 'Reset Username' });
    fireEvent.click(resetButton);

    // Verify username is reset in both store and UI
    const finalState = testStore.getState() as RootState;
    expect(finalState.auth.username).toBeNull();
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('should persist state between component renders', () => {
    const { rerender } = render(<Home />);

    // Set username
    const setButton = screen.getByRole('button', { name: 'Set Username' });
    fireEvent.click(setButton);

    // Rerender component
    rerender(<Home />);

    // Verify state persists
    expect(screen.getByRole('status')).toHaveTextContent('JohnDoe');
  });
});
