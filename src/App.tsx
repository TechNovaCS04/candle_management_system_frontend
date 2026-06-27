import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./features/auth/LoginPage";
import SignupPage from "./features/auth/SignupPage";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import AppLayout from "./components/layout/AppLayout";
import DashboardPage from "./features/dashboard/DashboardPage";
import ProductsPage from "./features/products/ProductsPage";
import RawMaterialsPage from "./features/rawMaterials/RawMaterialsPage";
import ProductionPage from "./features/production/ProductionPage";
import SalesPage from "./features/sales/SalesPage";
import CustomersPage from "./features/customers/CustomersPage";
import SuppliersPage from "./features/suppliers/SuppliersPage";
import EmployeesPage from "./features/employees/EmployeesPage";
import FinancePage from "./features/finance/FinancePage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/raw-materials" element={<RawMaterialsPage />} />
            <Route path="/production" element={<ProductionPage />} />
            <Route path="/sales" element={<SalesPage />} />
            <Route path="/customers" element={<CustomersPage />} />
            <Route path="/suppliers" element={<SuppliersPage />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/finance" element={<FinancePage />} />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
