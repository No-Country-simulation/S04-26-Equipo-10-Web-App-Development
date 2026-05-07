# OpsCore Project Memory

## 🟢 Project Status
- **Phase**: Authentication UI & Frontend Implementation
- **Current Branch**: `feat/login`
- **Frontend**: Vite + React + TS (RBAC Logic & Layout Ready)
- **Backend**: Express.js (Modular Domain Architecture - Auth Module Initialized)

## 📍 Active Tasks
- [x] Initialize Frontend with Vite + React + TypeScript <!-- id: 0 -->
- [x] Setup Design System (Tailwind CSS + Modern Aesthetics) <!-- id: 1 -->
- [x] Implement Base Layout (`feat/base-layout`) <!-- id: 5 -->
- [x] Implement Basic Routing (React Router) <!-- id: 3 -->
- [x] Implement Authentication Hooks & RBAC Infrastructure <!-- id: 4 -->
- [x] Implement Premium Login Page UI <!-- id: 7 -->
- [ ] Configure Axios/Fetch for Backend Integration <!-- id: 2 -->
- [ ] Fix/Implement Backend Router System (Missing `src/routes/index.js`) <!-- id: 6 -->

## 🛠️ Environment Status
- **OS**: Windows
- **Node Version**: v20+ (Target)
- **Backend Path**: `C:\Desarrollo\OpsCore\backend`
- **Frontend Path**: `C:\Desarrollo\OpsCore\frontend`

## 📚 Architectural Notes
- **Backend**: Modular by domain (`modules/`). Route -> Controller -> Service -> Repository -> DB. Needs a central router to aggregate module routes.
- **Frontend**: React-based (Tailwind CSS, Zustand, React Router). Using a centralized `authStore` for state and `RoleGuard` for RBAC.

## 📝 Session Compact
- **Commit**: `feat(auth): implement premium login page with Shadcn UI, Zod validation, and RBAC redirect`
  - Shadcn UI initialized (button, input, label, sonner). Path aliases configured.
  - `LoginPage.tsx` with Zod/RHF form, loading state, 4-user test panel.
  - `authService.ts` with strict whitelist (only 4 test emails allowed).
  - `authStore` refactored: `login()` → `setSession(user, token)`.
  - `App.tsx`: LoginPage integrated, Dev Switch removed, RBAC redirects finalized.
  - Gerente → `/metricas-de-reportes`, Supervisor → `/reportes`.
- **Previous Commit**: `feat(auth): implement RBAC infrastructure and Zustand persist` (ProtectedRoute, RoleGuard, authStore).
