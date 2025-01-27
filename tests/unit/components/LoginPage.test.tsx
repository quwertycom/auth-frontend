import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../utils/test-utils';
import LoginPage from '@/app/app/auth/login/page';
import React from 'react';

describe('LoginPage', () => {
  it('renders the login form correctly', () => {
    render(<LoginPage />);
    
    // Main app heading
    expect(screen.getByRole('heading', { name: 'QUWERTY Auth', level: 1 })).toBeInTheDocument();
    
    // Card header text - using className to be more specific
    const loginHeader = screen.getByText('Login', { selector: '.text-2xl' });
    expect(loginHeader).toBeInTheDocument();
    
    // Input fields
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    
    // Links and buttons
    expect(screen.getByRole('link', { name: 'Forgot Password?' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('handles form input correctly', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('has valid navigation links', () => {
    render(<LoginPage />);
    
    const forgotPasswordLink = screen.getByRole('link', { name: 'Forgot Password?' });
    expect(forgotPasswordLink).toHaveAttribute('href', '/app/auth/forgot-password');
  });

  it('renders the card component correctly', () => {
    render(<LoginPage />);
    
    const card = screen.getByTestId('heroui-card');
    expect(card).toBeInTheDocument();
    
    // Verify child elements - using className to be more specific
    const loginHeader = screen.getByText('Login', { selector: '.text-2xl' });
    expect(loginHeader).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('displays divider component', () => {
    render(<LoginPage />);
    expect(screen.getByRole('separator')).toBeInTheDocument();
  });
}); 