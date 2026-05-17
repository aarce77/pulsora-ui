# pulsora-ui

Pulsora is the React Native + Expo frontend for the Markov Trader API.

## Current Product Direction

The app is currently organized around a watchlist-first flow:
- `Home` is the primary screen
- `Home` combines watchlist rows, signal summaries, market pulse, and AI summary
- `Signal Detail` is a ticker drill-in that stays within the tab shell
- bottom navigation currently includes only `Home` and `Settings`

## Implemented Foundation

The repository currently includes:
- Expo Router application scaffold
- tokenized light and dark theme system
- persisted Zustand auth and theme stores
- Axios + Zod API boundary for Markov Trader endpoints
- watchlist-first mobile/web UI shell
- responsive signal detail screen
- Jest coverage for routing, contracts, stores, theme, and key screen flows

## Scripts

- `npm run start`
- `npm run web`
- `npm run ios`
- `npm run android`
- `npm run lint`
- `npm run typecheck`
- `npm run test`
- `npm run test:coverage`

## Environment

Set `EXPO_PUBLIC_API_BASE_URL` to point at the Markov Trader API.

Development default:

```txt
http://localhost:8000/api/v1
```
