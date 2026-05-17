# Home Work Items

## Current Priority Order

1. Home interaction scaffolding
- Implement local search filtering on the stock list
- Add a mock add-ticker flow from the `+` action
- Add empty states for:
  - no matching stocks
  - no watchlist items
Status: complete

2. Local UI state and persistence
- Move Home/watchlist state out of static mocks into a local feature store
- Persist user watchlist edits locally
- Keep static mock files as fixtures rather than active state
Status: complete

3. Signal detail polish
- Replace remaining non-functional detail affordances
- Make timeframe changes affect the displayed chart series locally
- Add more realistic ticker scenarios to reduce template repetition
Status: complete

4. Loading, empty, and error UI
- Add loading, error, retry, and not-found states for Home
- Add loading, error, retry, and not-found states for Signal Detail

5. Settings expansion
- Add more presentation-only preferences
- Expand notifications and confidence-mode controls

6. Accessibility and navigation hardening
- Audit touch targets and accessibility labels
- Add more route-level interaction tests

7. Visual polish against the mockups
- Tighten spacing, density, and typography
- Improve mobile and web proportion matching
