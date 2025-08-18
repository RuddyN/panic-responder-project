import "@testing-library/jest-dom";
// import '@testing-library/jest-dom/extend-expect';
import { afterAll, afterEach, beforeAll } from "vitest";
import { cleanup } from "@testing-library/react";
import { server } from "./src/mocks/node.js";

// Automatically clean up after each test to prevent test pollution
afterEach(() => {
  cleanup();
});

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
