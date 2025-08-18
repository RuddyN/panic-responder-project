
import '@testing-library/jest-dom';
// import '@testing-library/jest-dom/extend-expect';
import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

// Automatically clean up after each test to prevent test pollution
afterEach(() => {
  cleanup();
});