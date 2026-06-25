# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project context

This is the starter project for a Claude Code course (codewithmosh.com). It is a small React expense tracker that **intentionally has a bug, poor UI, and messy code** — these are meant to be fixed iteratively over the course, not necessarily all at once. Don't assume sloppiness elsewhere in the repo is accidental; check with the user before doing a broad cleanup.

The known intentional bug: `amount` on transactions is stored/typed as a string (`<input type="number">` values from `e.target.value` are strings, and the seed data in `src/App.jsx` uses string literals like `"5000"`). The income/expense/balance totals are computed with `reduce((sum, t) => sum + t.amount, 0)`, which string-concatenates instead of summing numerically.

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

The entire application is a single component: `src/App.jsx`. There is no router, no state management library, no API layer, and no component splitting — all state (`transactions`, the add-transaction form fields, and the two filter selects) lives in `useState` hooks at the top of `App`, and all UI (summary cards, add-transaction form, filterable transactions table) is rendered in one JSX tree.

- `src/main.jsx` — standard Vite/React entry point, mounts `<App />` into `#root`.
- `src/App.jsx` — all application logic and markup.
- `src/App.css` / `src/index.css` — plain CSS, no CSS modules or utility framework.
- Transactions are in-memory only (seeded with hardcoded sample data in `App.jsx`); nothing is persisted, and there is no backend.

When making changes, expect to edit `App.jsx` directly rather than looking for a separate hooks/services/components layer — none exists yet.
