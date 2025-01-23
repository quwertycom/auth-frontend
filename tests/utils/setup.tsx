import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock HeroUI components
vi.mock('@heroui/react', () => ({
  Button: ({ children, onPress }: { children: React.ReactNode; onPress?: () => void }) => (
    <button onClick={onPress}>{children}</button>
  ),
  HeroUIProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));