# Habit Tracker — Quick Reference

## 🚀 Quick Start

```bash
git clone https://github.com/bipin061singh/habit-tracker.git
cd habit-tracker
npm install
npm start
```

Visit: http://localhost:3000

---

## 🤖 Autonomous Growth Cycle

**Runs:** Every 20 minutes automatically

**What it does:**
1. `npm test` (CI mode)
2. Refactor one piece of code
3. Add next feature from queue
4. Commit & push to GitHub
5. Report to chat

---

## 🔄 Current Feature Queue

1. **Progress Bar** — visual completion %
2. **Dark Mode** — toggleable theme
3. **Reset Button** — delete all habits
4. **Export CSV** — download data
5. **Habit Categories** — group/tag habits
6. **Weekly View** — calendar-style display

*(Cycles back to 1 after 6)*

---

## 🧪 Testing

```bash
npm test          # Interactive
npm test -- --watchAll=false  # CI mode (one run)
```

**9 tests** covering:
- Adding habits
- Completing habits
- Streak tracking
- LocalStorage persistence
- Delete functionality

---

## 📁 Project Structure

```
src/
├── App.js          # Main component (habit logic)
├── App.test.js     # Test suite
├── index.js        # Entry point
├── index.css       # Styles
└── setupTests.js   # Test config
```

---

## 🔐 GitHub Authentication

Uses PAT: `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`
- Full repository access
- Embedded in remote URL
- **Recommendation:** Rotate token periodically

---

## 📝 Memory Files

Location: `/home/ubuntu/.openclaw/workspace/memory/`

- `cycle-history.md` — complete log of all cycles
- `cycle-state.json` — current state (next feature, stats)
- `last-cycle-report.txt` — most recent summary
- `last-test.log` — latest test output
- `npm-install.log` — dependency install logs

---

## 🛑 Stop Autonomous Cycles

```bash
openclaw cron remove 36950442-1dc4-4f84-a399-8bf0b150900f
```

---

## 📊 Current Status

| Metric | Value |
|--------|-------|
| Cycles run | 0 |
| Current feature | Progress Bar |
| Test status | Not run |
| Next run | 20 min |

---

## 🐛 Troubleshooting

**npm install hangs:**
- First run can take 2-5 min
- Subsequent runs are fast (cached)

**Tests fail:**
- Check `memory/last-test.log`
- Manual fix needed for now

**Push errors:**
- Verify PAT is valid
- Check `memory/cycle-history.md` for errors

---

## 📖 Full Documentation

See `PROJECT_DOCUMENTATION.md` for complete details.

---

**Last updated:** 2026-02-19  
**Auto-dev stage:** Initial setup complete
