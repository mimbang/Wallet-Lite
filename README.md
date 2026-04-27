"# Wallet-Lite" 
## Wallet-Lite

A React Native/Expo mobile application for personal financial management, featuring quick financial overviews, transaction history, and detailed charts for income/expense tracking.

### Features

- **Home Section**: Quick financial overview and transaction history.
- **Analyse Section**: Charts and statistics for income/expense tracking.
- **Authentication**: Firebase Auth with auto-redirects for unauthenticated users.
- **Data Storage**: Local SQLite for transactions and categories on native platforms; Firebase for authentication.
- **Theming**: Light/dark mode support with theme-aware components.

### Tech Stack

- **Framework**: Expo (React Native)
- **Language**: TypeScript
- **Authentication & Database**: Firebase Auth + Firestore (auth only; Firestore object exported but unused)
- **Local Database**: SQLite (native platforms only)
- **Navigation**: Expo Router with typed routes
- **State Management**: React Context API (AuthContext)
- **Styling**: Theme tokens with `useColorScheme()` hook

### Architecture

#### Expo Router with Auth Guards
- Root layout (`app/_layout.tsx`) wraps the app with `AuthProvider` and `ThemeProvider`.
- Routes organized in dynamic segments: `(auth)` for login/register, `(tabs)` for authenticated screens.
- `AuthContext` handles auto-redirects: unauthenticated users to login, authenticated users in auth group to home.
- Use typed routes via `expo-router` (e.g., `router.push()`, `router.replace()`).

#### AuthContext for State Management
- Global auth state via Context API.
- Tracks Firebase `User` object and `userAvatar`.
- Hook: `useAuth()` returns `{ user, setUser, userAvatar, setUserAvatar }`.
- Firebase `onAuthStateChanged()` listener manages routing on auth changes.

#### Dual Database Strategy
- **SQLite** (native platforms): Local storage for transactions and categories.
    - Tables: `categories` (name, type, icon), `transactions` (amount, category_id, date, description).
    - Functions: `openDB()`, `initDB()`, `insertTransaction()`, `deleteDatabase()`.
    - **Platform Check**: Wrap calls with `Platform.OS !== "web"` (web returns error string).
- **Firebase**: Auth only (Firestore db object exported but not used).

#### Service Layer Separation
- `services/transacation.tsx`: Transaction queries and stats (e.g., `getStatsByPeriod()`, `getChartData()`, `GetSmallTransac()`, `QuickInfoData()`).
- `services/stats.tsx`: Chart-specific aggregations (returns `ChartRow` type: label, income, expense).
- All functions use SQL SELECT with JOINs, period parameters ('day'|'week'|'month'), and handle web string errors.

#### Component Organization
- UI Components: `InfoCard.tsx`, `IconCircle.tsx`, `TransactionList.tsx`, `PeriodSelector.tsx`.
- Reusable: `themed-text.tsx`, `themed-view.tsx` (use color scheme context).
- Theme tokens: `constants/Color.tsx` (light/dark mode support).
- Use `useColorScheme()` hook for theme-aware styling.

### Installation

1. Clone the repository:
     ```bash
     git clone https://github.com/mimbang/Wallet-Lite.git
     cd Wallet-Lite
     ```

2. Install dependencies:
     ```bash
     npm install
     ```

3. Set up Firebase:
     - Configure `firebase/config.js` with your Firebase project credentials.

4. Run the app:
     ```bash
     npm start           # Start dev server
     npm run android     # Android emulator
     npm run ios         # iOS simulator
     npm run web         # Web version (no SQLite)
     ```

### Development Workflows

- **Linting**: `npm run lint` (Expo lint with TypeScript + ESLint).
- **Reset Project**: `npm run reset-project` (clears cache, resets assets).

### Key Conventions

- **Type Definitions**: Define response types (e.g., `ChartRow`, `Transaction`).
- **SQL Queries**: Use parameterized/safe joins; include `Platform.OS` checks.
- **Async Patterns**: Services return promises; use async/await in screens; handle web errors.
- **Routes**: Use typed expo-router routes; auth via context redirects.
- **Styling**: Use `StyleSheet.create()`; reference theme colors from constants.

### Debugging Notes

- Web version skips SQLite: Check `Platform.OS` in service calls.
- Auth redirects may loop if routes aren't guarded properly—verify segment names.
- Chart data: Ensure date formats match SQL `date()` function.

### Contributing

1. Fork the repository.
2. Create a feature branch.
3. Commit changes.
4. Push to the branch.
5. Open a pull request.

### License

This project is licensed under the MIT License.