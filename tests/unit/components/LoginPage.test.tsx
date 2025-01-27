import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../utils/test-utils';
import LoginPage from '@/app/app/auth/login/page';
import React from 'react';

describe('LoginPage', () => {
  it('renders the login form correctly', () => {
    render(<LoginPage />);

    // Main app heading
    expect(
      screen.getByRole('heading', { name: 'QUWERTY Auth', level: 1 }),
    ).toBeInTheDocument();

    // Card header text
    const loginHeader = screen.getByText('Login', {
      selector: 'div.text-2xl.font-bold',
    });
    expect(loginHeader).toBeInTheDocument();

    // Input fields
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Links and buttons
    expect(
      screen.getByRole('link', { name: /forgot password/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form input correctly', () => {
    render(<LoginPage />);

    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('has valid navigation links', () => {
    render(<LoginPage />);

    const forgotPasswordLink = screen.getByRole('link', {
      name: /forgot password/i,
    });
    expect(forgotPasswordLink).toHaveAttribute(
      'href',
      '/app/auth/forgot-password',
    );
  });

  it('renders the card component correctly', () => {
    render(<LoginPage />);

    // Card should be present - using class and structure instead of role
    const card = screen.getByTestId('heroui-card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('flex', 'flex-col', 'relative');

    // Verify child elements
    const loginHeader = screen.getByText('Login', { selector: 'div.text-2xl' });
    expect(loginHeader).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays divider component', () => {
    render(<LoginPage />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
});
