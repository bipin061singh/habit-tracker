import React, { useState, useEffect } from 'react';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Load habits from localStorage on mount
  useEffect(() => {
    const savedHabits = localStorage.getItem('habit-tracker-data');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save habits to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('habit-tracker-data', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (e) => {
    e.preventDefault();
    if (newHabit.trim() === '') return;

    const habit = {
      id: Date.now(),
      name: newHabit.trim(),
      completed: false,
      streak: 0,
      history: []
    };

    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const toggleHabit = (id) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const today = new Date().toDateString();
        const alreadyCompletedToday = habit.history.includes(today);

        let newStreak = habit.streak;
        let newHistory = [...habit.history];

        if (!alreadyCompletedToday) {
          newStreak += 1;
          newHistory.push(today);
        } else {
          newStreak = Math.max(0, newStreak - 1);
          newHistory = newHistory.filter(date => date !== today);
        }

        return {
          ...habit,
          completed: !alreadyCompletedToday,
          streak: newStreak,
          history: newHistory
        };
      }
      return habit;
    }));
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(h => h.completed).length;

  return (
    <div className="container">
      <h1>Habit Tracker</h1>

      <div className="stats">
        <p>{completedToday} of {totalHabits} completed today</p>
      </div>

      <form className="add-habit-form" onSubmit={addHabit}>
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Enter a new habit..."
          aria-label="New habit name"
        />
        <button type="submit">Add</button>
      </form>

      {habits.length === 0 ? (
        <p className="empty-state">No habits yet. Add your first one above!</p>
      ) : (
        <ul className="habit-list">
          {habits.map(habit => (
            <li key={habit.id} className="habit-item">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  className="habit-checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(habit.id)}
                  aria-label={`Mark ${habit.name} as ${habit.completed ? 'incomplete' : 'complete'}`}
                />
                <span className={`habit-name ${habit.completed ? 'habit-completed' : ''}`}>
                  {habit.name}
                </span>
                {habit.streak > 0 && (
                  <span className="streak-count">
                    🔥 {habit.streak} day streak
                  </span>
                )}
              </div>
              <button
                className="delete-btn"
                onClick={() => deleteHabit(habit.id)}
                aria-label={`Delete ${habit.name}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;