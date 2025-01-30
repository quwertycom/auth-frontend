import { vi } from 'vitest';

const useRouter = vi.fn(() => ({
  route: '/',
  pathname: '',
  query: {},
  asPath: '',
  push: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
  beforePopState: vi.fn(),
  events: {
    on: vi.fn(),
    off: vi.fn(),
    emit: vi.fn(),
  },
  isFallback: false,
}));

const usePathname = vi.fn(() => '/');
const useSearchParams = vi.fn(() => new URLSearchParams());

export { useRouter, usePathname, useSearchParams }; 