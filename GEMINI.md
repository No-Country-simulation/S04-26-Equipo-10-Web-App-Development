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
- **Branch Switch**: Switched to `feat/login` after merging `feat/hook-auth` into `develop`.
- **Commit**: `feat(auth): implement RBAC infrastructure and Zustand persist` (Created ProtectedRoute, RoleGuard, and refactored authStore).
- **Previous Commit**: `feat: implement responsive MainLayout with RBAC (dev mode)` (Tailwind config, responsive DesktopNav, MobileNav, Zustand auth store).
