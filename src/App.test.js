import React from 'react';
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react';
import App from './App';

// Mock localStorage with proper override
const localStorageMock = {
  getItem: jest.fn(() => null),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

describe('Habit Tracker App', () => {
  beforeEach(() => {
    // Reset localStorage mock before each test
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  afterEach(() => {
    cleanup();
    document.body.innerHTML = '';
  });

  test('renders app title', () => {
    render(<App />);
    expect(screen.getByText(/Habit Tracker/i)).toBeInTheDocument();
  });

  test('renders empty state when no habits', () => {
    render(<App />);
    expect(screen.getByText(/No habits yet/i)).toBeInTheDocument();
  });

  test('adds a new habit', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Exercise daily' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Exercise daily/i)).toBeInTheDocument();
    });
  });

  test('does not add empty habit', async () => {
    render(<App />);

    const addButton = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(addButton);

    // Should still show empty state because no habit was added
    await waitFor(() => {
      expect(screen.getByText(/No habits yet/i)).toBeInTheDocument();
    });

    // Stats should show 0 completed of 0 total
    expect(screen.getByText(/0 of 0 completed today/i)).toBeInTheDocument();
  });

  test('toggles habit completion', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Read books' } });
    fireEvent.click(addButton);

    // Wait for habit to appear
    await waitFor(() => {
      expect(screen.getByText(/Read books/i)).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(checkbox).toBeChecked();
    });
  });

  test('deletes a habit', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Meditate' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Meditate/i)).toBeInTheDocument();
    });

    // Use getByRole('button') with name 'Delete Meditate' to be specific
    const deleteButton = screen.getByRole('button', { name: /Delete Meditate/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(/Meditate/i)).not.toBeInTheDocument();
    });
  });

  test('shows streak count after completing habit', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Drink water' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Drink water/i)).toBeInTheDocument();
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await waitFor(() => {
      expect(screen.getByText(/1 day streak/i)).toBeInTheDocument();
    });
  });

  test('saves habits to localStorage', async () => {
    render(<App />);

    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Test habit' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(screen.getByText(/Test habit/i)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'habit-tracker-data',
        expect.any(String)
      );
    });
  });

  test('loads habits from localStorage', async () => {
    const savedHabits = JSON.stringify([
      {
        id: 1,
        name: 'Saved habit',
        completed: false,
        streak: 0,
        history: []
      }
    ]);
    localStorageMock.getItem.mockReturnValue(savedHabits);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Saved habit/i)).toBeInTheDocument();
    });
  });
});