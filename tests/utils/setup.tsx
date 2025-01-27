import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';

// Mock HeroUI components
vi.mock('@heroui/react', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="heroui-card" className={className}>
      {children}
    </div>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div className="flex p-3 w-full">
      {children}
    </div>
  ),
  CardBody: ({ children }: { children: React.ReactNode }) => (
    <div className="p-3 flex flex-col gap-4">
      {children}
    </div>
  ),
  CardFooter: ({ children }: { children: React.ReactNode }) => (
    <div className="p-3">
      {children}
    </div>
  ),
  Input: ({ label, ...props }: { label: string; [key: string]: any }) => (
    <div className="form-control">
      <label>
        {label}
        <input aria-label={label} {...props} />
      </label>
    </div>
  ),
  Button: ({ children, onPress, ...props }: { children: React.ReactNode; onPress?: () => void; [key: string]: any }) => (
    <button onClick={onPress} {...props}>{children}</button>
  ),
  Link: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: any }) => (
    <a href={href} {...props}>{children}</a>
  ),
  Divider: () => <hr role="separator" />,
  HeroUIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
