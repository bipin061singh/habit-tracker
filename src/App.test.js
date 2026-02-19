import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};
global.localStorage = localStorageMock;

describe('Habit Tracker App', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockReturnValue(null);
    localStorageMock.setItem.mockClear();
  });

  test('renders app title', () => {
    render(<App />);
    const titleElement = screen.getByText(/Habit Tracker/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders empty state when no habits', () => {
    render(<App />);
    const emptyState = screen.getByText(/No habits yet/i);
    expect(emptyState).toBeInTheDocument();
  });

  test('adds a new habit', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Exercise daily' } });
    fireEvent.click(addButton);

    expect(screen.getByText(/Exercise daily/i)).toBeInTheDocument();
  });

  test('does not add empty habit', () => {
    render(<App />);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.click(addButton);

    const emptyState = screen.getByText(/No habits yet/i);
    expect(emptyState).toBeInTheDocument();
  });

  test('toggles habit completion', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Read books' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test('deletes a habit', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Meditate' } });
    fireEvent.click(addButton);

    const deleteButton = screen.getByText(/Delete/i);
    fireEvent.click(deleteButton);

    expect(screen.queryByText(/Meditate/i)).not.toBeInTheDocument();
  });

  test('shows streak count after completing habit', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Drink water' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(screen.getByText(/1 day streak/i)).toBeInTheDocument();
  });

  test('saves habits to localStorage', () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/Enter a new habit/i);
    const addButton = screen.getByRole('button', { name: /Add/i });

    fireEvent.change(input, { target: { value: 'Test habit' } });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'habit-tracker-data',
      expect.any(String)
    );
  });

  test('loads habits from localStorage', () => {
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

    // Wait for state to update after render
    // The habit should be in the list
    expect(screen.getByText(/Saved habit/i)).toBeInTheDocument();
  });
});