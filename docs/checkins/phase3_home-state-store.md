# Phase 3 Check-In: Home State Store

## Summary

- Moved Home/watchlist interaction state into a dedicated persisted feature store.
- Kept static mock data as seed fixtures instead of the active runtime source of truth.
- Updated Home tests to seed the store directly rather than overriding runtime component props.

## Scope Completed

- Added a persisted `useHomeStore` for:
  - watchlist items
  - search value
  - add-overlay search value
  - add-overlay open state
- Persisted watchlist item changes locally while excluding transient UI state from storage.
- Removed runtime store re-seeding from `WatchlistGrid` so persisted edits survive screen remounts.
- Added store-level regression coverage for persistence behavior.

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test -- --runInBand`
