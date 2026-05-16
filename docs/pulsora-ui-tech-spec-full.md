
# Pulsora UI — Technical Specification

*React Native Frontend Implementation Reference for Development Team*

Version 1.1 — April 2026

> Naming convention:
> Pulsora = product/UI brand
> Markov Trader API = backend service only

---

# 1. Product Vision

Pulsora is an AI-powered market intelligence platform focused on beginner and intermediate traders.

The UI should feel:
- Premium
- Modern
- Calm
- Explainable
- Fast
- Trustworthy

Avoid:
- Crypto casino aesthetics
- Overly technical UX
- Dense quant dashboards
- Flashing animations

---

# 2. Frontend Stack

| Layer | Technology |
|---|---|
| Framework | React Native + Expo |
| Language | TypeScript |
| Routing | Expo Router |
| State | Zustand |
| Server State | TanStack Query |
| Styling | NativeWind |
| Validation | Zod |
| API Client | Axios |
| Charts | Victory Native / Skia |
| Animation | Reanimated |
| Forms | React Hook Form |
| Icons | Lucide React Native |

---

# 3. Architecture Principles

Mandatory:
- SOLID principles
- Clean Architecture
- Feature-based modular structure
- Strict TypeScript typing
- Reusable components
- Token-based theme system
- Runtime validation with Zod

Never:
- Hardcode colors
- Put API logic in screens
- Duplicate UI patterns
- Mix domain and presentation logic

---

# 4. Project Structure

```txt
pulsora-ui/
├── app/
│   ├── _layout.tsx
│   ├── (tabs)/
│   │   ├── dashboard.tsx
│   │   ├── watchlist.tsx
│   │   ├── intelligence.tsx
│   │   ├── signals.tsx
│   │   └── profile.tsx
│   └── signal/
│       └── [ticker].tsx
│
├── src/
│   ├── api/
│   │   ├── client.ts
│   │   ├── endpoints.ts
│   │   ├── contracts/
│   │   └── queries/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── charts/
│   │   ├── signals/
│   │   ├── watchlist/
│   │   └── layout/
│   │
│   ├── features/
│   │   ├── dashboard/
│   │   ├── watchlist/
│   │   ├── signal-detail/
│   │   ├── intelligence/
│   │   └── profile/
│   │
│   ├── theme/
│   ├── store/
│   ├── hooks/
│   ├── utils/
│   └── types/
│
├── assets/
└── docs/
```

---

# 5. Backend Boundary

Pulsora UI consumes the Markov Trader API.

The frontend must NOT implement:
- Indicator calculations
- Signal scoring
- HMM inference
- XGBoost logic
- Confidence engine
- Sentiment engine
- Risk guardrails

These belong exclusively to the Markov Trader API.

---

# 6. Markov Trader API Base URL

Development:

```ts
export const API_BASE_URL = "http://localhost:8000/api/v1";
```

Production:

```ts
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
```

---

# 7. Authentication

Endpoints:

```http
POST /dev/signup
POST /dev/login
```

Persist:
- access_token
- user_id

Use Zustand for auth persistence.

---

# 8. API Contracts

All API responses must:
- use TypeScript interfaces
- use Zod validation
- be isolated from UI components

## Signal Endpoint

```http
GET /signal/{ticker}?interval=1d
```

Required fields:
- signal
- confidence
- indicators
- regime
- risk flags
- explanations
- sentiment

## Watchlist

```http
GET /watchlist
POST /watchlist
```

## Sentiment

```http
GET /sentiment/{ticker}
```

---

# 9. API Layer

Create:

```txt
src/api/client.ts
```

Responsibilities:
- Axios instance
- auth injection
- retries
- response normalization
- error handling

Example:

```ts
export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 15000,
});
```

---

# 10. State Management

## Zustand

Use ONLY for:
- auth
- theme
- local preferences
- UI state

## TanStack Query

Use for:
- watchlist
- signals
- sentiment
- markets
- server state

Never duplicate server state inside Zustand.

---

# 11. Theme System

## Light Theme

```ts
export const lightColors = {
  background: "#F7F8FC",
  surface: "#FFFFFF",
  elevated: "#EEF2FF",

  textPrimary: "#111827",
  textSecondary: "#667085",

  primary: "#6D5EF5",

  success: "#22C55E",
  warning: "#F59E0B",
  danger: "#EF4444",
};
```

## Dark Theme

```ts
export const darkColors = {
  background: "#060816",
  surface: "#0E1324",
  elevated: "#131A2E",

  textPrimary: "#FFFFFF",
  textSecondary: "#94A3B8",

  primary: "#7C6CFF",

  success: "#00D09C",
  warning: "#F5B942",
  danger: "#FF5C5C",
};
```

---

# 12. Typography

Fonts:
- Inter
- SF Pro
- system fallback

Scale:

| Token | Size |
|---|---|
| display | 32 |
| h1 | 28 |
| h2 | 24 |
| h3 | 20 |
| body | 16 |
| bodySmall | 14 |
| caption | 12 |

---

# 13. Core Components

Required reusable components:

- SignalBadge
- ConfidenceRing
- RegimeCapsule
- RiskFlagPill
- DriverCard
- WatchlistRow
- MarketCard
- NewsCard
- SentimentGauge
- IndicatorContributionBar

---

# 14. Mobile Screens

## Dashboard
Sections:
- AI summary
- market regime
- top signals
- sentiment pulse
- watchlist preview
- risk overview

## Watchlist
Features:
- search
- filters
- sort
- add ticker
- pull to refresh

## Signal Detail
Features:
- chart
- signal
- confidence
- indicators
- bullish drivers
- bearish drivers
- risk flags
- regime state
- forward guidance

## Intelligence
Features:
- news
- sentiment
- event tags
- market insights

## Profile
Features:
- theme toggle
- notifications
- confidence mode
- sign out

---

# 15. Navigation

Use:
- Expo Router
- Bottom Tabs
- Native Stack

Primary Tabs:
- Dashboard
- Watchlist
- Intelligence
- Signals
- Profile

Signal detail route:

```txt
/signal/[ticker]
```

---

# 16. UX Priorities

Priority order:
1. Signal clarity
2. Confidence
3. Explainability
4. Risk awareness
5. Indicators
6. ML internals

Use progressive disclosure.

Beginner users should not be overwhelmed.

---

# 17. Accessibility

Must support:
- dynamic fonts
- screen readers
- reduced motion
- dark mode
- touch target minimums
- WCAG contrast compliance

---

# 18. Performance

Requirements:
- FlashList for large lists
- lazy loading
- memoization
- avoid unnecessary rerenders
- optimized chart rendering

---

# 19. Animations

Use:
- subtle fades
- smooth transitions
- animated confidence rings

Avoid:
- flashing
- bouncing
- noisy effects

---

# 20. Error Handling

Every screen must support:
- loading
- empty state
- error state
- retry
- unauthorized
- offline mode

---

# 21. Development Milestones

## Phase 1
- Expo setup
- routing
- theme system
- auth
- API layer

## Phase 2
- Dashboard
- Watchlist
- Signal Detail

## Phase 3
- Intelligence
- charts
- polish

## Phase 4
- animations
- accessibility
- performance optimization

---

# 22. Immediate Tasks For Codex

1. Initialize Expo TypeScript app
2. Install dependencies
3. Configure Expo Router
4. Configure NativeWind
5. Configure Zustand
6. Configure TanStack Query
7. Create theme system
8. Create reusable components
9. Implement bottom tabs
10. Implement dashboard
11. Connect Markov Trader API
12. Add authentication
13. Implement signal detail screen

---

# 23. Final Product Goal

Pulsora should become:

"An AI-powered market intelligence platform with explainable signals and institutional-grade clarity for everyday traders."

The experience should feel:
- premium
- intelligent
- scalable
- beginner friendly
- calm
- trustworthy

---

# 24. Naming Rules

Use:
- Pulsora → user-facing product/UI
- Markov Trader API → backend only

Never expose "Markov Trader" in user-facing UI.
