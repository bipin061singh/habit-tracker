import '@testing-library/jest-dom';

// Additional global cleanup to ensure DOM is reset between tests
beforeEach(() => {
  document.body.innerHTML = '';
});