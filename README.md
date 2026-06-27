# Sangeetha Candles Management System (Frontend)

A POS-style admin web app for managing a candle production & sales business — built with **React + TypeScript + Vite + Tailwind CSS v4 + Redux Toolkit**.

This is the **frontend-only** build. All data is currently mock data wired through Redux (in `src/data/mockData.ts` + slices in each `features/*` folder). When the Flask/MySQL backend is ready, replace the mock arrays with real API calls — the component code does not need to change, only the slice initial data / async thunks.

## Getting Started

```bash
npm install
npm run dev      # starts dev server, usually http://localhost:5173
npm run build    # production build -> dist/
```


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
├── app/                 
├── components/
│   ├── layout/         
│   └── ui/
├── store/
|   ├── store.ts                 
│                           
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
|   ├── finance/            # Employee CRUD + Attendance tab
│   └── reports/              # Revenue + Expense tabs, profit summary
|
├── lib/
│   ├── createEntitySlice.ts  # Generic CRUD slice factory (used by every module)
│   ├── useEntityPage.ts       # Search + pagination hook
│   └── utils.ts                 # formatCurrency, formatDate, generateId, etc.
└── types/
    └── index.ts             # All TypeScript interfaces (mirrors the ER diagram)
```

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


**Built With TechNova Team**.