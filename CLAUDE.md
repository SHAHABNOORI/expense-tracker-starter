# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for a Claude Code course (codewithmosh.com). It is a small React expense tracker that **intentionally has a bug, poor UI, and messy code** — these are meant to be fixed iteratively over the course, not necessarily all at once. Don't assume sloppiness elsewhere in the repo is accidental; check with the user before doing a broad cleanup.

## Commands

```bash
npm install     # install deps
npm run dev     # start Vite dev server at http://localhost:5173
npm run build   # production build
npm run preview # preview the production build locally
npm run lint    # eslint .
```

There is no test suite/runner configured in this project.

Node engine requirement: `vite@7` and `@vitejs/plugin-react@5` require Node `^20.19.0 || >=22.12.0`. Older Node 20.x (e.g. 20.17) will emit an `EBADENGINE` warning on install but the dev server still runs.

## Architecture

There is no router, no state management library, and no API layer. Transactions are in-memory only (seeded with hardcoded sample data in `App.jsx`); nothing is persisted and there is no backend.

The app is split into four components:

- **`App.jsx`** — holds the `transactions` array in state (the only shared state). Passes it down to children and provides an `onAdd` callback to `TransactionForm`.
- **`Summary.jsx`** — receives `transactions`, derives `totalIncome`, `totalExpenses`, and `balance` internally, and renders the three summary cards.
- **`TransactionForm.jsx`** — owns its own form state (`description`, `amount`, `type`, `category`). On submit, calls `onAdd(transaction)` with a fully constructed transaction object (amount already converted to `Number`).
- **`TransactionList.jsx`** — owns its own filter state (`filterType`, `filterCategory`). Receives `transactions`, applies filters locally, and renders the table.

Supporting files:
- `src/main.jsx` — Vite/React entry point, mounts `<App />` into `#root`.
- `src/App.css` / `src/index.css` — plain CSS, no CSS modules or utility framework.

The `categories` array (`["food", "housing", ...]`) is currently duplicated in `TransactionForm` and `TransactionList`; it has not been extracted to a shared location yet.
