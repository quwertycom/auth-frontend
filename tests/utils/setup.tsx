import '@testing-library/jest-dom';
import { vi } from 'vitest';
import type * as HeroUI from '@heroui/react';

// Mock HeroUI components
vi.mock('@heroui/react', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof HeroUI;
  return {
    ...actual,
    // Mock specific components that need custom implementations
    Button: ({
      children,
      onPress,
    }: {
      children: React.ReactNode;
      onPress?: () => void;
    }) => <button onClick={onPress}>{children}</button>,
    HeroUIProvider: ({ children }: { children: React.ReactNode }) => (
      <>{children}</>
    ),
    // Other components will use their actual implementations
  };
});
