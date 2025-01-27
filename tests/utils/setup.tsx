import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type * as HeroUI from '@heroui/react';
import React from 'react';

// Create a base mock for all components
const createComponentMock = (name: string) => {
  return ({ children, ...props }: { children?: React.ReactNode; [key: string]: any }) => {
    // Convert props to data attributes for testing
    const dataProps = Object.entries(props).reduce((acc, [key, value]) => {
      acc[`data-${key}`] = value;
      return acc;
    }, {} as Record<string, any>);

    return React.createElement(
      'div',
      { 
        'data-testid': `heroui-${name.toLowerCase()}`,
        ...dataProps
      },
      children
    );
  };
};

// Mock HeroUI components
vi.mock('@heroui/react', async (importOriginal) => {
  const actual = await importOriginal() as typeof HeroUI;
  
  // Create automatic mocks for all components
  const autoMocks = Object.keys(actual).reduce((acc, componentName) => {
    acc[componentName] = createComponentMock(componentName);
    return acc;
  }, {} as Record<string, any>);

  return {
    ...autoMocks,
    // Override specific components that need custom implementations
    Button: ({
      children,
      onPress,
      className,
    }: {
      children: React.ReactNode;
      onPress?: () => void;
      className?: string;
    }) => (
      <button className={className} onClick={onPress} data-testid="heroui-button">
        {children}
      </button>
    ),
    HeroUIProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    Card: ({ children }: { children: React.ReactNode }) => {
      const CardContext = React.createContext({});
      return (
        <CardContext.Provider value={{}}>
          <div role="region" data-testid="heroui-card">
            {children}
          </div>
        </CardContext.Provider>
      );
    },
    CardHeader: ({ children }: { children: React.ReactNode }) => (
      <div role="heading">{children}</div>
    ),
    CardBody: ({ children }: { children: React.ReactNode }) => (
      <div role="contentinfo" aria-label="Login Form">
        {children}
      </div>
    ),
    CardFooter: ({ children }: { children: React.ReactNode }) => (
      <div role="contentinfo">{children}</div>
    ),
    Input: ({ label }: { label: string }) => (
      <div>
        <label>{label}</label>
        <input aria-label={label} />
      </div>
    ),
    Divider: () => <hr />,
    Link: ({ children, href }: { children: React.ReactNode; href: string }) => (
      <a href={href} data-testid="heroui-link">
        {children}
      </a>
    ),
    // Add other custom mocks here if needed
  };
});
