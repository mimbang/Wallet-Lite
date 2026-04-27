# Wallet-Lite Codebase Guide for AI Agents

## Project Overview
**Wallet-Lite** is a React Native/Expo mobile application for personal financial management with two main sections:
- **Home**: Quick financial overview and transaction history
- **Analyse**: Charts and statistics for income/expense tracking

Tech stack: Expo (React Native), TypeScript, Firebase Auth + Firestore, SQLite (native), React Navigation.

## Architecture Patterns

### 1. **Expo Router with Auth Guards** 
File: [app/_layout.tsx](../frontend/Wallet_lite/app/_layout.tsx), [app/(auth)/_layout.tsx](../frontend/Wallet_lite/app/(auth)/_layout.tsx)

- Root layout wraps app with `AuthProvider` and `ThemeProvider`
- Routes organized in dynamic segments: `(auth)` for login/register, `(tabs)` for authenticated screens
- `AuthContext` auto-redirects: unauthenticated users → login, authenticated users in auth group → home
- Use `expo-router` typed routes (enabled in app.json) - `router.push()`, `router.replace()`

### 2. **AuthContext for State Management**
File: [Context/AuthContext.tsx](../frontend/Wallet_lite/Context/AuthContext.tsx)

- Global auth state via Context API (no Redux)
- Tracks: Firebase `User` object + `userAvatar` 
- Hook: `useAuth()` returns `{ user, setUser, userAvatar, setUserAvatar }`
- Firebase integration: `onAuthStateChanged()` listener auto-manages routing on auth changes

### 3. **Dual Database Strategy**
Files: [services/database.tsx](../frontend/Wallet_lite/services/database.tsx), [firebase/config.js](../frontend/Wallet_lite/firebase/config.js)

- **SQLite** (native platforms): Local transactions/categories storage
  - Tables: `categories` (name, type, icon), `transactions` (amount, category_id, date, description)
  - Functions: `openDB()`, `initDB()`, `insertTransaction()`, `deleteDatabase()`
  - **Platform check required**: Wrap calls with `Platform.OS !== "web"` checks (web returns error string)
- **Firebase**: Auth only (currently; Firestore db object exported but not used)

### 4. **Service Layer Separation**
Files: [services/transacation.tsx](../frontend/Wallet_lite/services/transacation.tsx), [services/stats.tsx](../frontend/Wallet_lite/services/stats.tsx)

- `transacation.tsx`: Transaction queries + stats (income/expense by period)
  - Functions: `getStatsByPeriod()`, `getChartData()`, `GetSmallTransac()`, `QuickInfoData()`
- `stats.tsx`: Chart-specific aggregations for dashboard
  - Returns formatted data for charts: `ChartRow` type (label, income, expense)
- All functions: SQL SELECT with JOINs, period parameters ('day'|'week'|'month'), null/string error handling for web

### 5. **Component Organization**
Files: [components/](../frontend/Wallet_lite/components/)

- **UI Components**: `InfoCard.tsx`, `IconCircle.tsx`, `TransactionList.tsx`, `PeriodSelector.tsx`
- **Reusable**: `themed-text.tsx`, `themed-view.tsx` (use color scheme context)
- **Theme tokens**: [constants/Color.tsx](../frontend/Wallet_lite/constants/Color.tsx) (light/dark mode support)
- Use `useColorScheme()` hook in components for theme-aware styling

## Development Workflows

### Run the app
```bash
npm start           # Start dev server
npm run android     # Android emulator
npm run ios         # iOS simulator
npm run web         # Web version (no SQLite)
```

### Linting
```bash
npm run lint        # Expo lint (TypeScript + ESLint)
```

### Reset Project
```bash
npm run reset-project  # Clean slate (clears cache, assets reset)
```

## Critical Conventions

1. **Type Definitions**: Always define response types (e.g., `ChartRow` for chart data, `Transaction` for UI)
2. **SQL Queries**: Use parameterized/safe joins, include `Platform.OS` checks before db calls
3. **Async Patterns**: Services return promises; use async/await in screens, handle web string errors
4. **Routes**: Use typed routes from expo-router; auth flows via context-driven redirects, not manual checks
5. **Styling**: Use `StyleSheet.create()` for performance; reference theme colors from constants

## Key Integration Points

- **Firebase Config**: [firebase/config.js](../frontend/Wallet_lite/firebase/config.js) - singleton pattern with `getApps()`
- **Mock Data**: [fake/data.js](../frontend/Wallet_lite/fake/data.js) - for testing UI without DB
- **Assets**: Icons/images in [assets/images/](../frontend/Wallet_lite/assets/images/) and [assets/background/](../frontend/Wallet_lite/assets/background/)
- **Hooks**: Custom hooks in [hooks/](../frontend/Wallet_lite/hooks/) - `use-color-scheme.ts`, `use-theme-color.ts`

## Common Debugging Notes

- Web version skips SQLite: check `Platform.OS` in service calls
- Auth context redirects may loop if routes aren't properly guarded - verify segment names match
- Chart data aggregation: ensure date formats match SQL date() function expectations
