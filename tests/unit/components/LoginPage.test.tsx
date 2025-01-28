import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../utils/test-utils';
import LoginPage from '@/app/app/auth/login/page';
import React from 'react';

describe('LoginPage', () => {
  it('renders the login form correctly', () => {
    render(<LoginPage />);

    // Card header text
    const loginHeader = screen.getByText('Login with qID', {
      selector: 'div.text-center.text-3xl.font-bold',
    });
    expect(loginHeader).toBeInTheDocument();

    // Input fields
    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    // Links and buttons
    expect(
      screen.getByRole('link', { name: /forgot password/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('handles form input correctly', () => {
    render(<LoginPage />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(usernameInput).toHaveValue('testuser');
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

    const registerLink = screen.getByRole('link', {
      name: /don't have an account\? register/i,
    });
    expect(registerLink).toHaveAttribute(
      'href',
      '/app/auth/register',
    );
  });

  it('renders the card component correctly', () => {
    render(<LoginPage />);

    // Card should be present
    const card = screen.getByTestId('heroui-card');
    expect(card).toBeInTheDocument();

    // Verify child elements
    const loginHeader = screen.getByText('Login with qID', {
      selector: 'div.text-center.text-3xl.font-bold',
    });
    expect(loginHeader).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('displays divider component', () => {
    render(<LoginPage />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  describe('form validation', () => {
    it('shows error messages for empty fields', () => {
      render(<LoginPage />);

      const loginButton = screen.getByRole('button', { name: /login/i });
      fireEvent.click(loginButton);

      expect(
        screen.getByText('Please enter your username'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please enter your password'),
      ).toBeInTheDocument();
    });

    it('validates username format', () => {
      render(<LoginPage />);

      const usernameInput = screen.getByLabelText(/username/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      // Test invalid username with special characters
      fireEvent.change(usernameInput, { target: { value: 'test@user!' } });
      fireEvent.click(loginButton);
      expect(
        screen.getByText('Only letters, numbers, - and _ allowed'),
      ).toBeInTheDocument();

      // Test username too short
      fireEvent.change(usernameInput, { target: { value: 'ab' } });
      fireEvent.click(loginButton);
      expect(
        screen.getByText('Only letters, numbers, - and _ allowed'),
      ).toBeInTheDocument();

      // Test valid username
      fireEvent.change(usernameInput, { target: { value: 'valid-user_123' } });
      fireEvent.click(loginButton);
      expect(
        screen.queryByText('Only letters, numbers, - and _ allowed'),
      ).not.toBeInTheDocument();
    });

    it('validates password length', () => {
      render(<LoginPage />);

      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      // Test password too short
      fireEvent.change(passwordInput, { target: { value: '1234567' } });
      fireEvent.click(loginButton);
      expect(
        screen.getByText('Enter at least 8 characters'),
      ).toBeInTheDocument();

      // Test valid password
      fireEvent.change(passwordInput, { target: { value: '12345678' } });
      fireEvent.click(loginButton);
      expect(
        screen.queryByText('Enter at least 8 characters'),
      ).not.toBeInTheDocument();
    });

    it('handles Enter key press for form submission', () => {
      render(<LoginPage />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);

      // Test empty fields with Enter key
      fireEvent.keyDown(usernameInput, { key: 'Enter' });
      expect(
        screen.getByText('Please enter your username'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please enter your password'),
      ).toBeInTheDocument();

      // Test valid input with Enter key
      fireEvent.change(usernameInput, { target: { value: 'validuser' } });
      fireEvent.change(passwordInput, {
        target: { value: 'validpassword123' },
      });
      fireEvent.keyDown(passwordInput, { key: 'Enter' });

      // Verify no error messages are shown
      expect(
        screen.queryByText('Please enter your username'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Please enter your password'),
      ).not.toBeInTheDocument();
    });

    it('clears previous error messages when input is valid', () => {
      render(<LoginPage />);

      const usernameInput = screen.getByLabelText(/username/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const loginButton = screen.getByRole('button', { name: /login/i });

      // First show errors
      fireEvent.click(loginButton);
      expect(
        screen.getByText('Please enter your username'),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Please enter your password'),
      ).toBeInTheDocument();

      // Then enter valid input
      fireEvent.change(usernameInput, { target: { value: 'validuser' } });
      fireEvent.change(passwordInput, {
        target: { value: 'validpassword123' },
      });
      fireEvent.click(loginButton);

      // Verify errors are cleared
      expect(
        screen.queryByText('Please enter your username'),
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText('Please enter your password'),
      ).not.toBeInTheDocument();
    });
  });
});
