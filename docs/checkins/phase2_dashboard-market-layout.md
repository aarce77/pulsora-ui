# phase2/dashboard-market-layout

**Date:** 2026-05-16
**Author:** Codex

## Summary
Fixed the dashboard market-tile responsiveness so the index cards align more predictably with the full-width Market Pulse section across device sizes. The previous layout relied on `minWidth` and wrapping heuristics, which caused inconsistent tile stacking and misalignment at certain breakpoints.

## Key Changes / Key Additions
- Added explicit dashboard layout utilities for market-tile column and width rules.
- Updated the market index strip to use deterministic 4-column, 2-column, and 1-column layouts instead of flexible wrap guesses.
- Updated the dashboard grid to pass column behavior based on viewport width.
- Added a focused unit test covering the market tile breakpoint rules.

## Tests Added/Updated
| Test File | Tests | Coverage Target |
|:----------|:------|:----------------|
| `src/features/dashboard/utils/__tests__/dashboard-layout.test.ts` | 3 tests | Layout breakpoint logic — 90% |
| `src/features/dashboard/screens/__tests__/dashboard-screen.test.tsx` | 1 retained smoke test | Dashboard shell — 90% |
| `src/features/watchlist/screens/__tests__/watchlist-screen.test.tsx` | 1 retained smoke test | Watchlist shell — 90% |

## Files Changed
- Updated dashboard layout logic under `src/features/dashboard/components/`.
- Added layout breakpoint utilities and tests under `src/features/dashboard/utils/`.
- Added this implementation checkin under `docs/checkins/`.
