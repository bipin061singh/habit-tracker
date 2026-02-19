# Habit Tracker — Autonomous Development System

## 📋 Project Overview

A minimal React-based habit tracking application with autonomous self-improvement cycles. The app tracks daily habits, streaks, and completion status, while a background system continuously enhances it every 20 minutes.

---

## 🎯 Core Features

### User Features
- ✅ Add and track daily habits
- ✅ Mark habits as complete (checkbox toggle)
- ✅ Streak counter (consecutive days)
- ✅ LocalStorage persistence (survives refresh)
- ✅ Clean, responsive UI with gradient background
- ✅ Stats display (X of Y completed today)

### Developer Features
- ✅ Autonomous growth cycles (every 20 min)
- ✅ Auto-testing with CI mode
- ✅ Refactoring rotation (3 types)
- ✅ Feature queue (6 planned features)
- ✅ Comprehensive test suite (9 tests)
- ✅ Git integration with auto-commit/push
- ✅ Full cycle logging and state tracking

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | React 18 |
| **Build Tool** | Create React Scripts (react-scripts 5.0.1) |
| **Styling** | CSS3 (custom with gradients, flexbox) |
| **Testing** | React Testing Library + Jest |
| **Data** | LocalStorage (browser) |
| **Version Control** | Git + GitHub |
| **Language** | JavaScript (ES6+) |

---

## 📁 Project Structure

```
habit-tracker/
├── public/
│   └── index.html           # HTML template
├── src/
│   ├── App.js               # Main React component with habit logic
│   ├── App.test.js          # 9 unit tests
│   ├── index.js             # React entry point
│   ├── index.css            # Global styles
│   └── setupTests.js        # Test configuration
├── .gitignore               # Excludes node_modules, build, env files
├── README.md                # User documentation
├── package.json             # Dependencies and scripts
├── run-tests.js            # Standalone test runner (no npm)
└── growth_cycle.py         # Autonomous development script (outside repo)
```

---

## 🤖 Autonomous Growth Cycle

### Overview

A Python script (`growth_cycle.py`) runs every 20 minutes via cron and performs:

1. **Health Check** → Run `npm test` (CI mode)
2. **Refactor** → Rotate through 3 refactoring patterns
3. **Feature Build** → Implement next feature from queue
4. **Deploy** → Commit & push to GitHub
5. **Report** → Send summary to chat + update logs

### Schedule

- **Cron interval:** 1,200,000 ms (20 minutes)
- **Cron job name:** "Habit Tracker Growth Cycle"
- **Cron ID:** `36950442-1dc4-4f84-a399-8bf0b150900f`
- **Timeout:** 600 seconds (10 minutes)

### Memory Files (in `/memory/`)

| File | Purpose |
|------|---------|
| `cycle-history.md` | Full log of all growth cycles |
| `cycle-state.json` | Current state: feature index, refactor history |
| `last-cycle-report.txt` | Most recent cycle summary |
| `npm-install.log` | Dependency installation output |
| `last-test.log` | Latest test run output |

---

## 🔄 Refactoring Rotation

The cycle applies one refactoring pattern based on cycle count:

| Type | Description | When |
|------|-------------|------|
| **0** | Convert `var` → `const`/`let` in JavaScript files | Cycles 1, 4, 7, ... |
| **1** | Extract magic numbers to named constants | Cycles 2, 5, 8, ... |
| **2** | Add explanatory comments to complex code | Cycles 3, 6, 9, ... |

---

## 🚀 Feature Build Queue

Features are implemented in order and cycle repeats:

| Index | Feature | Description | Status |
|-------|---------|-------------|--------|
| 0 | **Progress Bar** | Visual completion percentage bar | Pending |
| 1 | **Dark Mode** | Toggleable dark theme | Pending |
| 2 | **Reset Button** | Delete all habits at once | Pending |
| 3 | **Export CSV** | Download habit data as CSV | Pending |
| 4 | **Habit Categories** | Group habits by tags/categories | Pending |
| 5 | **Weekly View** | See habits in weekly calendar view | Pending |

After index 5, it cycles back to 0.

---

## 🧪 Testing

### Test Suite (9 tests)

```bash
npm test -- --watchAll=false
```

**Tests cover:**
1. Renders app title
2. Renders empty state when no habits
3. Adds a new habit
4. Does not add empty habit
5. Toggles habit completion
6. Deletes a habit
7. Shows streak count after completing habit
8. Saves habits to localStorage
9. Loads habits from localStorage

All tests run in CI mode (no watch).

---

## 📦 Installation & Usage

### For Users

```bash
git clone https://github.com/bipin061singh/habit-tracker.git
cd habit-tracker
npm install
npm start
```

Open http://localhost:3000 in your browser.

### For Developers (Autonomous System)

The growth cycle runs automatically every 20 minutes. To run manually:

```bash
cd /home/ubuntu/.openclaw/workspace
python3 growth_cycle.py
```

---

## 📝 Commit Message Format

Autonomous commits follow this pattern:

```
Growth cycle 2026-02-19 19:42:18 UTC - Tests: PASS
```

Or with more detail if a feature was added:

```
Growth cycle 2026-02-19 20:00:00 UTC - added progress-bar feature
```

---

## 🔐 GitHub PAT Details

- **Token used:** `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` (ALL permissions)
- **Repo:** `bipin061singh/habit-tracker`
- **Remote:** HTTPS with embedded token
- **Recommendation:** Rotate token after a few cycles for security

---

## 📊 Cycle Lifecycle

```
┌─────────────────────────────────┐
│   Start Cycle (every 20 min)    │
├─────────────────────────────────┤
│ 1. Check/install dependencies   │
│ 2. Run npm test (CI mode)       │
│ 3. Apply refactor pattern       │
│ 4. Build next feature from queue│
│ 5. git add -A                   │
│ 6. git commit + push            │
│ 7. Log to memory files          │
│ 8. Send report to chat          │
└─────────────────────────────────┘
```

---

## 🛑 Emergency Stop

To halt autonomous cycles:

```bash
openclaw cron remove 36950442-1dc4-4f84-a399-8bf0b150900f
```

Or simply disable in the OpenClaw gateway UI.

---

## 📈 Current Status

| Item | Value |
|------|-------|
| **Cycle count** | 0 (starting) |
| **Current feature index** | 0 (Progress Bar) |
| **Last test status** | Not run yet |
| **Last refactor type** | None yet |
| **Next feature** | Progress Bar |
| **Next cycle** | 20 minutes from start |

---

## 🔧 Advanced Configuration

### Changing the Interval

Edit the cron job:

```bash
openclaw cron update <job-id> --patch '{"schedule": {"everyMs": 1800000}}'  # 30 min
```

### Modifying Feature Queue

Edit `memory/cycle-state.json`:

```json
{
  "feature_queue": ["progress-bar", "dark-mode", "your-feature-here"]
}
```

### Adding Refactoring Patterns

Extend `refactor_code()` in `growth_cycle.py` with new patterns.

---

## 📚 Resources

- **Habit Tracker Repo:** https://github.com/bipin061singh/habit-tracker
- **React Docs:** https://reactjs.org/docs
- **Testing Library:** https://testing-library.com/docs/react-testing-library/intro

---

## 📄 License

MIT (feel free to modify and use)

---

**Last Updated:** 2026-02-19  
**Version:** 0.1.0 (autonomous dev enabled)
