# pulsora-ui

Pulsora is the React Native + Expo frontend for the Markov Trader API.

## Phase 1 status

The repository now contains:
- Expo Router application scaffold
- Tokenized light and dark theme system
- Persisted Zustand auth and theme stores
- Axios + Zod API boundary for Markov Trader endpoints
- Jest baseline tests for contracts, stores, theme, and shell rendering

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
