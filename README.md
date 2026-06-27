# Sangeetha Candles — Admin Dashboard (Frontend)

A POS-style admin web app for managing a candle production & sales business — built with **React + TypeScript + Vite + Tailwind CSS v4 + Redux Toolkit**.

This is the **frontend-only** build. All data is currently mock data wired through Redux (in `src/data/mockData.ts` + slices in each `features/*` folder). When the Flask/MySQL backend is ready, replace the mock arrays with real API calls — the component code does not need to change, only the slice initial data / async thunks.

## Getting Started

```bash
npm install
npm run dev      # starts dev server, usually http://localhost:5173
npm run build    # production build -> dist/
```

**Login:** the app uses mock authentication. On the login page, enter **any email** and a **password of 6+ characters** to sign in. Signup works the same way and logs you straight into the dashboard.

## Tech Stack

- **React 18 + TypeScript + Vite**
- **Tailwind CSS v4** (uses the new `@theme` token syntax in `src/index.css` — no `tailwind.config.js` needed for colors/fonts)
- **Redux Toolkit + react-redux** for state management
- **React Router v6** for routing
- **recharts** for dashboard charts
- **lucide-react** for icons

## Project Structure

```
src/
├── app/                  # Redux store + typed hooks
├── components/
│   ├── layout/           # Sidebar, Topbar, AppLayout, ProtectedRoute
│   └── ui/                # Reusable primitives: Button, Input, Modal, DataTable,
│                           Pagination, Card, Badge, Tabs, ConfirmDialog, PageHeader
├── data/
│   └── mockData.ts        # All mock seed data (swap for API calls later)
├── features/
│   ├── auth/               # Login, Signup, AuthLayout, authSlice
│   ├── dashboard/           # Dashboard page, StatCard
│   ├── products/            # Product CRUD
│   ├── rawMaterials/        # Raw material CRUD + low-stock detection
│   ├── production/          # Production batch CRUD
│   ├── sales/                # Sales/orders CRUD with line items
│   ├── customers/            # Customer CRUD
│   ├── suppliers/            # Supplier CRUD
│   ├── employees/            # Employee CRUD + Attendance tab
│   └── finance/              # Revenue + Expense tabs, profit summary
├── lib/
│   ├── createEntitySlice.ts  # Generic CRUD slice factory (used by every module)
│   ├── useEntityPage.ts       # Search + pagination hook
│   └── utils.ts                 # formatCurrency, formatDate, generateId, etc.
└── types/
    └── index.ts             # All TypeScript interfaces (mirrors the ER diagram)
```

## Pattern used in every module

Every entity (Products, Customers, Suppliers, etc.) follows the **same repeatable pattern**, so once you understand one module you understand them all:

1. **`<entity>Slice.ts`** — built with `createEntitySlice()`, gives you `addItem`, `updateItem`, `removeItem`, `setSearchTerm`, `setPage` for free.
2. **`<Entity>FormModal.tsx`** — controlled form inside a `Modal`, with validation, used for both Add and Edit (passing `initialData` switches mode).
3. **`<Entity>Page.tsx`** — uses `useEntityPage()` for search+pagination, renders a `DataTable` with columns, wires up Add/Edit/Delete actions and a `ConfirmDialog` for deletes.

To connect a real backend later: replace the `mockX` arrays in `mockData.ts` with data fetched via `createAsyncThunk`, and swap `addItem`/`updateItem`/`removeItem` dispatches for thunks that call your Flask API, then `.unwrap()` the result into the same reducers.

## Design System

- **Palette:** warm cream background, bronze/amber primary, sage green for success/stock-ok, ember red for danger/low-stock, amber for warnings — evokes a candle workshop rather than a generic SaaS dashboard.
- **Fonts:** `Fraunces` (display/headings) + `Inter` (body/data) — loaded via Google Fonts in `index.html`.
- **Responsive:** sidebar collapses into a slide-over drawer below the `lg` breakpoint; all data tables fall back to stacked cards on mobile (`DataTable.tsx` handles this automatically per column via `hideOnMobile`).

## Pages / Routes

| Route | Page | Notes |
|---|---|---|
| `/login` | Login | Mock auth |
| `/signup` | Signup | Mock registration |
| `/dashboard` | Dashboard | KPIs, charts, low-stock alerts, recent orders |
| `/products` | Products | Finished candle inventory |
| `/raw-materials` | Raw Materials | Wax, oils, dyes, wicks, containers + reorder alerts |
| `/production` | Production | Batches: planned → in progress → completed |
| `/sales` | Sales & Orders | Orders with line items, view/edit/delete |
| `/customers` | Customers | Customer records |
| `/suppliers` | Suppliers | Supplier records |
| `/employees` | Employees | Employee records + Attendance tab |
| `/finance` | Finance | Revenue + Expense tabs, profit summary |

All routes except `/login` and `/signup` are behind `ProtectedRoute` (redirects to `/login` if not authenticated).

## Next Steps (Backend Integration)

When your Flask backend is ready (matching the ER diagram: `Admin`, `Supplier`, `RawMaterial`, `ProductionBatch`, `BatchMaterial`, `Product`, `SaleItem`, `Sale`, `Customer`, `Employee`, `Attendance`, `Expense`, `Revenue`):

1. Create an `axios`/`fetch` API client in `src/lib/api.ts` with your base URL.
2. In each `<entity>Slice.ts`, replace the static `mockX` import with `createAsyncThunk` calls (`fetchProducts`, `createProduct`, etc.) and handle `pending/fulfilled/rejected` in `extraReducers`.
3. Replace the mock `loginSuccess` timeout in `LoginPage.tsx` / `SignupPage.tsx` with real POST calls to your auth endpoints, storing the JWT returned by Flask.
4. Keep all component code (`*Page.tsx`, `*FormModal.tsx`) as-is — they only depend on the slice's `items`, `searchTerm`, `page`, `pageSize` shape, not on where the data came from.
