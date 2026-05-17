# Phase 3 Check-In: Loading and Error States

## Summary

- Added explicit loading and error states for the Home screen.
- Added explicit loading, error, and not-found states for the signal-detail screen.
- Introduced shared state-card primitives so future API-backed routes can reuse the same state surfaces.

## Scope Completed

- Added reusable UI primitives for:
  - state cards
  - simple skeleton placeholders
- Wired `Home` to support:
  - loading
  - error with retry
  - existing empty states
- Wired signal detail to support:
  - loading
  - error with retry
  - not-found for unknown tickers
- Updated signal-detail scenario resolution so only known tickers render fallback detail scenarios.
- Added regression coverage for all new screen-state paths.

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run test -- --runInBand`
