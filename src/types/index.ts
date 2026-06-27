// Core domain types — mirrors backend ER diagram entities.
// When the real backend is ready, these types should match API DTOs.

export type Role = "ADMIN";

export interface Admin {
  adminId: string;
  email: string;
  fullName?: string;
}

export interface Supplier {
  supplierId: string;
  name: string;
  contactNo: string;
  email: string;
  address: string;
}

export interface RawMaterial {
  materialId: string;
  name: string;
  unit: string; // kg, litre, pcs, etc.
  quantityInStock: number;
  reorderLevel: number;
  supplierId: string;
  supplierName?: string;
}

export type ProductionStatus = "PLANNED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

export interface ProductionBatch {
  batchId: string;
  productId: string;
  productName?: string;
  productionDate: string; // ISO date
  quantityProduced: number;
  status: ProductionStatus;
  materialsUsed: BatchMaterial[];
}

export interface BatchMaterial {
  batchId: string;
  materialId: string;
  materialName?: string;
  quantityUsed: number;
  unit?: string;
}

export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  category?: string;
  imageUrl?: string;
}

export interface SaleItem {
  saleItemId: string;
  saleId: string;
  productId: string;
  productName?: string;
  quantity: number;
  unitPrice: number;
}

export type SaleStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "CANCELLED";

export interface Sale {
  saleId: string;
  customerId: string;
  customerName?: string;
  saleDate: string;
  totalAmount: number;
  status: SaleStatus;
  items: SaleItem[];
}

export interface Customer {
  customerId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  totalOrders?: number;
}

export type EmployeeDesignation = "MANAGER" | "PRODUCTION_STAFF" | "SALES_STAFF" | "ACCOUNTANT" | "OTHER";

export interface Employee {
  employeeId: string;
  name: string;
  position: EmployeeDesignation;
  phone: string;
  salary: number;
  joinedDate?: string;
}

export type AttendanceStatus = "PRESENT" | "ABSENT" | "LEAVE" | "HALF_DAY";

export interface Attendance {
  attendanceId: string;
  employeeId: string;
  employeeName?: string;
  date: string;
  status: AttendanceStatus;
}

export interface Expense {
  expenseId: string;
  description: string;
  amount: number;
  expenseDate: string;
  category?: string;
}

export interface Revenue {
  revenueId: string;
  saleId: string;
  amount: number;
  receivedDate: string;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  totalItems: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  admin: Admin | null;
  token: string | null;
}
