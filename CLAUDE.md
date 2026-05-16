# CLAUDE.md

This document defines the mandatory engineering workflow, branching strategy, testing discipline, and commit documentation requirements for the Pulsora UI project.

Pulsora is a React Native + Expo frontend application that consumes the Markov Trader API backend.

---

# Commit Checkins

Every commit must have a corresponding markdown file in `docs/checkins/` named:

```txt
{phase}_{description}.md
```

The filename must match the branch naming pattern.

Example:

```txt
phase1_signal-detail-screen.md
```

Each checkin file must summarize:
- what was added
- what changed
- why the changes were made
- tests added or updated
- affected files/modules

Use the following structure:

```md
# <phase>/<description>

**Date:** <YYYY-MM-DD>
**Author:** <author>

## Summary
<paragraph describing the purpose and scope of the changes>

## Key Changes / Key Additions
<sections with tables or bullet points detailing what was added or modified>

## Tests Added/Updated
| Test File | Tests | Coverage Target |
|:----------|:------|:----------------|
| <path> | <count> tests | <module> — <coverage%> |

## Files Changed
<summary of files changed with counts, or a table of notable files>
```

---

# Branching Strategy

Each chunk of work gets its own branch named:

```txt
{phase}/{description}
```

Examples:

```txt
phase1/project-scaffold
phase1/theme-system
phase1/api-client
phase2/signal-detail-screen
phase2/watchlist-screen
phase3/intelligence-screen
```

Requirements:
- Create and checkout the branch BEFORE starting implementation.
- Keep branches focused and isolated.
- Avoid unrelated changes in the same branch.
- Merge only after linting, type checks, and tests pass.
- Delete stale branches after merge.

---

# Testing Requirements

All new UI code MUST have tests.

All modified UI code MUST have corresponding test updates.

Target:

```txt
~90% coverage on new or modified TypeScript/React Native modules
```

Run unit/component test coverage with:

```bash
npm test -- --coverage
```

If the project uses pnpm instead of npm, run:

```bash
pnpm test -- --coverage
```

If the project uses yarn instead of npm, run:

```bash
yarn test --coverage
```

Recommended testing stack:

| Test Type | Tooling |
|---|---|
| Unit tests | Jest |
| Component tests | React Native Testing Library |
| Hook tests | React Native Testing Library / Jest |
| API contract tests | Zod schema fixtures |
| Navigation smoke tests | Expo Router test utilities where applicable |
| End-to-end tests | Detox or Maestro |

Requirements:
- Tests must be deterministic.
- Mock Markov Trader API calls.
- Validate API contracts with Zod fixtures.
- Cover loading, error, empty, and success states.
- Cover light and dark theme rendering where relevant.
- Cover accessibility labels for key interactive elements.
- Add regression tests for fixed bugs.
- Do not use backend-only Python test commands such as `pytest` in the Pulsora UI project.

---

# Type Checking and Linting

Every implementation branch must pass TypeScript and lint checks before merge.

Recommended commands:

```bash
npm run typecheck
npm run lint
```

If these scripts do not exist yet, add them to `package.json`.

Expected scripts:

```json
{
  "scripts": {
    "lint": "expo lint",
    "typecheck": "tsc --noEmit",
    "test": "jest"
  }
}
```

---

# Engineering Discipline (MANDATORY)

All implementation work must follow:

- SOLID principles
- Clean Architecture
- Feature modularization
- Reusable component design
- Strict TypeScript typing
- Runtime validation using Zod
- Token-based theming
- Separation of concerns

Avoid:
- God components
- Massive screens
- Duplicated business logic
- Inline API calls in screens
- Hardcoded theme values
- Shared mutable module state
- Backend-only commands, libraries, or assumptions in the UI codebase

---

# Design-First Workflow

Before implementation:

1. Identify the responsibility boundary.
2. Verify existing abstractions before adding new ones.
3. Check for duplicate utilities/components.
4. Validate type contracts end-to-end.
5. Define invariants that must remain true.
6. Define falsifiable tests before coding.

Questions to answer before coding:

- What is this module’s single responsibility?
- Does this extend an abstraction or violate OCP?
- Is a reusable abstraction already present?
- What state transitions could break?
- What tests would fail if assumptions are wrong?
- Is this logic UI-specific, or does it belong in the Markov Trader API?

---

# React Native UI Standards

Pulsora UI must:

- Support light + dark themes
- Be beginner-friendly
- Feel premium and modern
- Use progressive disclosure
- Prioritize signal clarity
- Keep screens responsive and performant
- Keep the Pulsora brand visible in user-facing areas
- Refer to Markov Trader API only in developer/integration contexts

Required stack:

| Layer | Technology |
|---|---|
| Framework | React Native + Expo |
| Routing | Expo Router |
| Styling | NativeWind |
| State | Zustand |
| Server State | TanStack Query |
| Validation | Zod |
| Animation | Reanimated |
| Charts | Victory Native / Skia |
| Tests | Jest + React Native Testing Library |

---

# API Boundary Rules

Pulsora UI consumes the Markov Trader API.

Frontend code must NOT implement:
- indicator computation
- signal scoring
- HMM inference
- XGBoost logic
- sentiment processing
- confidence scoring
- risk guardrails

Those belong exclusively to the backend.

UI code may:
- call API endpoints
- validate API responses
- transform API data into UI view models
- format values for display
- handle loading/error/empty states
- cache server state with TanStack Query

---

# Theme and Styling Rules

All UI styling must use the Pulsora theme system.

Requirements:
- No hardcoded colors inside screen files.
- No duplicated spacing/radius values.
- Use theme tokens for colors, spacing, typography, shadows, and radii.
- Validate components in both light and dark mode.
- Ensure signal colors are consistent across the app.

Signal color rules:
- BUY = success
- HOLD = warning
- SELL = danger

---

# Component Standards

Components must be:
- small
- focused
- reusable where practical
- testable
- accessible
- typed

Component files should avoid:
- embedded API calls
- global side effects
- large inline style objects
- unrelated responsibilities

Preferred pattern:

```txt
feature/
├── components/
├── hooks/
├── mappers/
├── screens/
└── __tests__/
```

---

# Commit Quality Checklist

Before every commit:

- [ ] Lint passes
- [ ] TypeScript type check passes
- [ ] Tests pass
- [ ] Coverage target met
- [ ] New files staged
- [ ] Checkin markdown created
- [ ] No dead code
- [ ] No duplicated logic
- [ ] Types validated
- [ ] UI tested in light + dark mode
- [ ] Responsive behavior verified
- [ ] API contracts validated
- [ ] No backend-only commands or dependencies introduced

---

# Pull Request Checklist

Before opening a pull request:

- [ ] Branch name follows `{phase}/{description}`
- [ ] Checkin file exists in `checkins/`
- [ ] PR scope matches branch purpose
- [ ] Screenshots or screen recordings attached for UI changes
- [ ] Light mode verified
- [ ] Dark mode verified
- [ ] Accessibility labels verified for new interactive elements
- [ ] API fixtures updated when contracts change
- [ ] Tests added or updated
- [ ] Coverage reviewed

---

# Final Goal

Pulsora should feel like:

> “An AI-powered market intelligence platform with explainable signals and institutional-grade clarity for everyday traders.”

The engineering quality should prioritize:
- maintainability
- scalability
- clarity
- correctness
- performance
- developer ergonomics
