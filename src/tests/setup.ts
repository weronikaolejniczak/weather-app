import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

import { afterAll, afterEach, beforeAll, expect } from 'vitest';

import '@/mocks/match-media';
import { server } from '@/mocks/node';

expect.extend(matchers);

// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// Close server after all tests
afterAll(() => server.close());

// Reset handlers after each test `important for test isolation`
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
