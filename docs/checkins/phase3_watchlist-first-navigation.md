# phase3/watchlist-first-navigation

**Date:** 2026-05-16
**Author:** Codex

## Summary
Refactored the app into a watchlist-first flow where Home is the primary screen, the watchlist and signal-overview responsibilities are combined, and bottom navigation is reduced to Home and Settings. Signal detail remains intact but now lives under the Home route so tab chrome persists during ticker drill-in.

## Key Changes / Key Additions
- Reworked the tab layout from five destinations to two: `Home` and `Settings`.
- Moved ticker detail routing under the Home tab flow and updated redirects so the app lands on Home by default.
- Rebuilt the watchlist screen into a stock-only Home experience with market pulse, AI summary, and a consolidated signal-aware ticker table.
- Removed the old asset tabs and obsolete Dashboard, Signals, and Intel entry routes from the active app structure.
- Updated the settings surface naming from Profile to Settings and aligned signal-detail back navigation with the new Home-first IA.

## Tests Added/Updated
| Test File | Tests | Coverage Target |
|:----------|:------|:----------------|
| `app/__tests__/routing.test.tsx` | 2 redirect smoke tests | App routing — 90% |
| `app/(tabs)/__tests__/layout.test.tsx` | 1 tab layout smoke test | Bottom navigation — 90% |
| `src/features/watchlist/screens/__tests__/watchlist-screen.test.tsx` | 2 updated tests | Home/watchlist shell — 90% |
| `src/features/signals/screens/__tests__/signal-detail-screen.test.tsx` | 3 updated regression tests | Signal detail flow — 90% |

## Files Changed
- Updated tab routing under `app/(tabs)/` to support Home and Settings only, with nested Home ticker detail routes.
- Reworked watchlist data and components into the new Home/watchlist-first screen behavior.
- Removed obsolete active-screen route wiring and replaced it with route and navigation smoke tests.
- Added this implementation checkin under `docs/checkins/`.
