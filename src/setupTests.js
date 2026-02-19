import '@testing-library/jest-dom';

// Mock localStorage with a jest mock that persists across tests but is reset per test
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

// Expose the mock globally so individual test files can adjust it per-test
global.localStorageMock = localStorageMock;

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

// Global cleanup before each test: reset DOM and localStorage mock state
beforeEach(() => {
  document.body.innerHTML = '';
  localStorageMock.getItem.mockReturnValue(null);
  localStorageMock.setItem.mockClear();
  localStorageMock.removeItem.mockClear();
  localStorageMock.clear.mockClear();
});