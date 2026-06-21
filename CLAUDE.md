# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Dev
npm start               # Start Expo dev server (opens QR + menu)
npm run ios             # Run on iOS simulator (requires Xcode)
npm run android         # Run on Android emulator

# Code quality
npm run lint            # ESLint via expo lint
npm run lint:fix        # ESLint with auto-fix
npm run format          # Prettier write (src/**)
npm run format:check    # Prettier check only
```

No test suite is configured yet. TypeScript is checked implicitly via `tsc` (strict mode, `expo/tsconfig.base`).

## Architecture

### Routing (Expo Router, file-based)

All screens live under `src/app/`. Route groups control layout nesting:

```
src/app/
  _layout.tsx              # Root layout — wraps AuthProvider, ThemeProvider, RootNavigator
  index.tsx                # Redirect stub
  (auth)/                  # Unauthenticated screens (login, signup)
  (tabs)/
    _layout.tsx            # NativeTabs shell (uses expo-router/unstable-native-tabs, NOT standard Tabs)
    (home)/                # Home tab stack
      index.tsx            # Dashboard
  create-group.tsx         # Modal (presentation: 'modal')
  group/[id]/
    index.tsx              # Group detail
    add-expense.tsx        # Modal
    budget.tsx
    members.tsx
```

### Authentication

Auth state is managed by **two separate layers** that serve different purposes:

1. **`AuthProvider` + `AuthContext`** (`src/providers/auth-provider.tsx`, `src/hooks/use-auth-context.tsx`) — React Context that holds the live Supabase `Session` object and `isInitialized` flag. This is the single source of truth.
2. **`authSlice`** (`src/store/slices/authSlice.ts`) — Zustand slice that mirrors session state for components that prefer the store. Keep both in sync when updating auth logic.

`RootNavigator` in `src/app/_layout.tsx` reads `useAuthContext()` and uses `Stack.Protected` + a `useEffect` to gate `(tabs)` behind authentication and redirect accordingly.

### State (Zustand)

Single store at `src/store/index.ts`, composed of slices:

- `authSlice` — session state
- `expenseSlice` — expenses list + loading flag

Devtools are enabled in development via `@csark0812/zustand-expo-devtools`. Add new domain slices as separate files in `src/store/slices/` and compose them in `index.ts`.

### Theming

- **Token source**: `src/constants/theme.ts` exports `Colors` (light/dark palettes), `Fonts`, `Spacing`, `BottomTabInset`, `MaxContentWidth`.
- **Usage**: always consume via `useTheme()` from `src/hooks/use-theme.ts` — never hardcode hex values in components.
- Color palette: Deep Indigo primary (`#070235`), Teal accent (`#006a61`), cool-toned neutrals.

### Backend (Supabase)

- Client: `src/utils/supabase.ts` — typed with `Database` from `src/types/database.types.ts` (auto-generated, don't hand-edit).
- Env vars required: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_KEY` (in `.env`).
- Supabase project: `geiqnjxucmgkhqkrvpcn`, region `ap-south-1`.

**Schema** (8 tables, all with RLS):

| Table | Notes |
|---|---|
| `profiles` | Extends `auth.users`; auto-created on signup via DB trigger |
| `categories` | 10 defaults seeded per user on signup |
| `budgets` | Monthly/weekly, overall or per-category |
| `expenses` | Core transaction table |
| `groups` | Expense-splitting groups |
| `group_members` | Join table; RLS via `is_group_member()` security definer |
| `expense_splits` | Per-person split amounts; Realtime enabled |
| `settlements` | Debt payoff records; Realtime enabled |

Monetary amounts use `numeric(12,2)`. Timestamps use `timestamptz`.

### Path Aliases

`@/*` → `src/*` and `@/assets/*` → `assets/*` (configured in `tsconfig.json`). Use these everywhere — no relative `../` imports across feature boundaries.

### Forms

Use **React Hook Form + Zod** for all form screens. Schema validation goes in the same file as the screen or in a co-located `schema.ts`.
