import { vi } from 'vitest';
import '@testing-library/jest-dom';

// Mock framer-motion
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    motion: new Proxy({}, {
      get: (_target, prop: string) => {
        return ({ children, ...props }: any) => {
          const Tag = prop as any;
          // Filter out motion-specific props
          const filteredProps = Object.fromEntries(
            Object.entries(props).filter(([key]) => 
              !['initial', 'animate', 'exit', 'transition', 'whileInView', 'whileHover', 'whileTap', 'viewport', 'variants', 'layout', 'layoutId'].includes(key)
            )
          );
          return <Tag {...filteredProps}>{children}</Tag>;
        };
      },
    }),
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useAnimation: () => ({ start: vi.fn(), stop: vi.fn() }),
    useInView: () => true,
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  disconnect = vi.fn();
  unobserve = vi.fn();
}
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock scrollTo
window.scrollTo = vi.fn();
