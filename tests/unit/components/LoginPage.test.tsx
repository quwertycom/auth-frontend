import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '../../utils/test-utils';
import LoginPage from '@/app/app/auth/login/page';
import React from 'react';

describe('LoginPage', () => {
  it('renders the login form correctly', () => {
    render(<LoginPage />);
    
    // Check for main elements
    expect(screen.getByText('QUWERTY Auth')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByText('Forgot Password?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  it('displays the correct input fields', () => {
    render(<LoginPage />);
    
    const emailInput = screen.getByLabelText('Email');
    const passwordInput = screen.getByLabelText('Password');
    
    // Test input fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('password123');
  });

  it('contains a working forgot password link', () => {
    render(<LoginPage />);
    
    const forgotPasswordLink = screen.getByText('Forgot Password?');
    expect(forgotPasswordLink).toHaveAttribute('href', '/app/auth/forgot-password');
  });

  it('has a properly styled login button', () => {
    render(<LoginPage />);
    
    const loginButton = screen.getByRole('button', { name: 'Login' });
    expect(loginButton).toHaveAttribute('class', 'w-full');
  });

  it('renders the card with correct context', () => {
    render(<LoginPage />);
    
    const card = screen.getByRole('region');
    const header = screen.getByRole('heading', { name: 'Login' });
    const body = screen.getByRole('contentinfo', { name: 'Login Form' });
    
    expect(card).toBeInTheDocument();
    expect(header).toHaveTextContent('Login');
    expect(body).toContainElement(screen.getByLabelText('Email'));
  });
}); 