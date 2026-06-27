import type {
  Supplier,
  RawMaterial,
  ProductionBatch,
  Product,
  Sale,
  Customer,
  Employee,
  Attendance,
  Expense,
  Revenue,
} from "../types";

export const mockSuppliers: Supplier[] = [
  { supplierId: "SUP-0001", name: "Kandy Wax Traders", contactNo: "081-2234567", email: "info@kandywax.lk", address: "45 Peradeniya Rd, Kandy" },
  { supplierId: "SUP-0002", name: "Ceylon Fragrance Oils", contactNo: "011-2987654", email: "sales@ceylonfragrance.lk", address: "12 Galle Rd, Colombo 03" },
  { supplierId: "SUP-0003", name: "Lanka Wick Co.", contactNo: "077-3456789", email: "orders@lankawick.lk", address: "8 Industrial Zone, Katunayake" },
  { supplierId: "SUP-0004", name: "Hill Country Dyes", contactNo: "081-4456123", email: "contact@hillcountrydyes.lk", address: "23 Matale Rd, Kandy" },
  { supplierId: "SUP-0005", name: "Pearl Container Supplies", contactNo: "071-9988776", email: "hello@pearlcontainers.lk", address: "67 Negombo Rd, Wattala" },
  { supplierId: "SUP-0006", name: "Sigiriya Soy Wax", contactNo: "066-2245567", email: "info@sigiriyasoy.lk", address: "5 Dambulla Rd, Sigiriya" },
];

export const mockRawMaterials: RawMaterial[] = [
  { materialId: "RM-0001", name: "Soy Wax Flakes", unit: "kg", quantityInStock: 120, reorderLevel: 40, supplierId: "SUP-0001", supplierName: "Kandy Wax Traders" },
  { materialId: "RM-0002", name: "Lavender Fragrance Oil", unit: "litre", quantityInStock: 8, reorderLevel: 10, supplierId: "SUP-0002", supplierName: "Ceylon Fragrance Oils" },
  { materialId: "RM-0003", name: "Cotton Wicks (Size 4)", unit: "pcs", quantityInStock: 850, reorderLevel: 200, supplierId: "SUP-0003", supplierName: "Lanka Wick Co." },
  { materialId: "RM-0004", name: "Crimson Red Dye", unit: "kg", quantityInStock: 3, reorderLevel: 5, supplierId: "SUP-0004", supplierName: "Hill Country Dyes" },
  { materialId: "RM-0005", name: "Glass Jar Containers (250ml)", unit: "pcs", quantityInStock: 300, reorderLevel: 100, supplierId: "SUP-0005", supplierName: "Pearl Container Supplies" },
  { materialId: "RM-0006", name: "Sandalwood Fragrance Oil", unit: "litre", quantityInStock: 14, reorderLevel: 10, supplierId: "SUP-0002", supplierName: "Ceylon Fragrance Oils" },
  { materialId: "RM-0007", name: "Paraffin Wax Blocks", unit: "kg", quantityInStock: 65, reorderLevel: 50, supplierId: "SUP-0006", supplierName: "Sigiriya Soy Wax" },
  { materialId: "RM-0008", name: "Golden Yellow Dye", unit: "kg", quantityInStock: 18, reorderLevel: 5, supplierId: "SUP-0004", supplierName: "Hill Country Dyes" },
  { materialId: "RM-0009", name: "Cotton Wicks (Size 6)", unit: "pcs", quantityInStock: 95, reorderLevel: 150, supplierId: "SUP-0003", supplierName: "Lanka Wick Co." },
  { materialId: "RM-0010", name: "Tin Container (Travel size)", unit: "pcs", quantityInStock: 420, reorderLevel: 100, supplierId: "SUP-0005", supplierName: "Pearl Container Supplies" },
];

export const mockProducts: Product[] = [
  { productId: "PRD-0001", name: "Lavender Bliss Jar Candle", description: "Soy wax candle with calming lavender fragrance, 250ml glass jar.", price: 1850, stockQuantity: 64, category: "Jar Candles" },
  { productId: "PRD-0002", name: "Sandalwood Serenity Candle", description: "Warm sandalwood scent in a reusable glass jar.", price: 2100, stockQuantity: 42, category: "Jar Candles" },
  { productId: "PRD-0003", name: "Ceylon Cinnamon Pillar", description: "Hand-poured cinnamon spice pillar candle.", price: 1450, stockQuantity: 8, category: "Pillar Candles" },
  { productId: "PRD-0004", name: "Travel Tin – Citrus Burst", description: "Compact citrus-scented candle in a travel tin.", price: 950, stockQuantity: 120, category: "Travel Tins" },
  { productId: "PRD-0005", name: "Rose Garden Votive Set (4)", description: "Set of 4 rose-scented votive candles.", price: 2600, stockQuantity: 30, category: "Votives" },
  { productId: "PRD-0006", name: "Vanilla Dream Jar Candle", description: "Sweet vanilla aroma in a 250ml glass jar.", price: 1800, stockQuantity: 5, category: "Jar Candles" },
  { productId: "PRD-0007", name: "Coconut & Lime Pillar", description: "Tropical coconut and lime pillar candle.", price: 1550, stockQuantity: 56, category: "Pillar Candles" },
  { productId: "PRD-0008", name: "Jasmine Night Votive Set (4)", description: "Delicate jasmine-scented votive set.", price: 2450, stockQuantity: 0, category: "Votives" },
];

export const mockProductionBatches: ProductionBatch[] = [
  {
    batchId: "BAT-0001", productId: "PRD-0001", productName: "Lavender Bliss Jar Candle",
    productionDate: "2026-06-10", quantityProduced: 80, status: "COMPLETED",
    materialsUsed: [
      { batchId: "BAT-0001", materialId: "RM-0001", materialName: "Soy Wax Flakes", quantityUsed: 24, unit: "kg" },
      { batchId: "BAT-0001", materialId: "RM-0002", materialName: "Lavender Fragrance Oil", quantityUsed: 2, unit: "litre" },
    ],
  },
  {
    batchId: "BAT-0002", productId: "PRD-0006", productName: "Vanilla Dream Jar Candle",
    productionDate: "2026-06-14", quantityProduced: 50, status: "COMPLETED",
    materialsUsed: [
      { batchId: "BAT-0002", materialId: "RM-0007", materialName: "Paraffin Wax Blocks", quantityUsed: 18, unit: "kg" },
    ],
  },
  {
    batchId: "BAT-0003", productId: "PRD-0003", productName: "Ceylon Cinnamon Pillar",
    productionDate: "2026-06-17", quantityProduced: 40, status: "IN_PROGRESS",
    materialsUsed: [
      { batchId: "BAT-0003", materialId: "RM-0007", materialName: "Paraffin Wax Blocks", quantityUsed: 15, unit: "kg" },
    ],
  },
  {
    batchId: "BAT-0004", productId: "PRD-0008", productName: "Jasmine Night Votive Set (4)",
    productionDate: "2026-06-20", quantityProduced: 60, status: "PLANNED",
    materialsUsed: [],
  },
  {
    batchId: "BAT-0005", productId: "PRD-0004", productName: "Travel Tin – Citrus Burst",
    productionDate: "2026-06-05", quantityProduced: 150, status: "COMPLETED",
    materialsUsed: [
      { batchId: "BAT-0005", materialId: "RM-0010", materialName: "Tin Container (Travel size)", quantityUsed: 150, unit: "pcs" },
    ],
  },
];

export const mockCustomers: Customer[] = [
  { customerId: "CUS-0001", name: "Dilani Perera", phone: "077-1112233", email: "dilani.p@gmail.com", address: "14 Lake Rd, Kandy", totalOrders: 5 },
  { customerId: "CUS-0002", name: "Nuwan Senanayake", phone: "071-2223344", email: "nuwan.s@gmail.com", address: "22 Temple St, Nugegoda", totalOrders: 2 },
  { customerId: "CUS-0003", name: "Amaya Fernando", phone: "076-3334455", email: "amaya.f@gmail.com", address: "9 Beach Rd, Galle", totalOrders: 8 },
  { customerId: "CUS-0004", name: "Kasun Wickramasinghe", phone: "070-4445566", email: "kasun.w@gmail.com", address: "31 Hill St, Kandy", totalOrders: 1 },
  { customerId: "CUS-0005", name: "Tharushi Bandara", phone: "075-5556677", email: "tharushi.b@gmail.com", address: "5 Park Rd, Colombo 07", totalOrders: 3 },
  { customerId: "CUS-0006", name: "Ishara Rathnayake", phone: "078-6667788", email: "ishara.r@gmail.com", address: "17 Station Rd, Matale", totalOrders: 6 },
];

export const mockSales: Sale[] = [
  {
    saleId: "SAL-0001", customerId: "CUS-0001", customerName: "Dilani Perera",
    saleDate: "2026-06-15", totalAmount: 5550, status: "COMPLETED",
    items: [
      { saleItemId: "SI-0001", saleId: "SAL-0001", productId: "PRD-0001", productName: "Lavender Bliss Jar Candle", quantity: 3, unitPrice: 1850 },
    ],
  },
  {
    saleId: "SAL-0002", customerId: "CUS-0003", customerName: "Amaya Fernando",
    saleDate: "2026-06-16", totalAmount: 3100, status: "COMPLETED",
    items: [
      { saleItemId: "SI-0002", saleId: "SAL-0002", productId: "PRD-0002", productName: "Sandalwood Serenity Candle", quantity: 1, unitPrice: 2100 },
      { saleItemId: "SI-0003", saleId: "SAL-0002", productId: "PRD-0004", productName: "Travel Tin – Citrus Burst", quantity: 1, unitPrice: 950 },
    ],
  },
  {
    saleId: "SAL-0003", customerId: "CUS-0002", customerName: "Nuwan Senanayake",
    saleDate: "2026-06-17", totalAmount: 2600, status: "PROCESSING",
    items: [
      { saleItemId: "SI-0004", saleId: "SAL-0003", productId: "PRD-0005", productName: "Rose Garden Votive Set (4)", quantity: 1, unitPrice: 2600 },
    ],
  },
  {
    saleId: "SAL-0004", customerId: "CUS-0005", customerName: "Tharushi Bandara",
    saleDate: "2026-06-18", totalAmount: 1900, status: "PENDING",
    items: [
      { saleItemId: "SI-0005", saleId: "SAL-0004", productId: "PRD-0006", productName: "Vanilla Dream Jar Candle", quantity: 1, unitPrice: 1800 },
    ],
  },
  {
    saleId: "SAL-0005", customerId: "CUS-0006", customerName: "Ishara Rathnayake",
    saleDate: "2026-06-18", totalAmount: 4650, status: "COMPLETED",
    items: [
      { saleItemId: "SI-0006", saleId: "SAL-0005", productId: "PRD-0001", productName: "Lavender Bliss Jar Candle", quantity: 1, unitPrice: 1850 },
      { saleItemId: "SI-0007", saleId: "SAL-0005", productId: "PRD-0007", productName: "Coconut & Lime Pillar", quantity: 1, unitPrice: 1550 },
      { saleItemId: "SI-0008", saleId: "SAL-0005", productId: "PRD-0003", productName: "Ceylon Cinnamon Pillar", quantity: 1, unitPrice: 1450 },
    ],
  },
  {
    saleId: "SAL-0006", customerId: "CUS-0004", customerName: "Kasun Wickramasinghe",
    saleDate: "2026-06-19", totalAmount: 950, status: "CANCELLED",
    items: [
      { saleItemId: "SI-0009", saleId: "SAL-0006", productId: "PRD-0004", productName: "Travel Tin – Citrus Burst", quantity: 1, unitPrice: 950 },
    ],
  },
];

export const mockEmployees: Employee[] = [
  { employeeId: "EMP-0001", name: "Ruwan Jayasuriya", position: "MANAGER", phone: "077-1010101", salary: 85000, joinedDate: "2023-01-15" },
  { employeeId: "EMP-0002", name: "Sachini Kumari", position: "PRODUCTION_STAFF", phone: "071-2020202", salary: 45000, joinedDate: "2023-03-10" },
  { employeeId: "EMP-0003", name: "Mahesh Gunaratne", position: "PRODUCTION_STAFF", phone: "076-3030303", salary: 45000, joinedDate: "2023-05-22" },
  { employeeId: "EMP-0004", name: "Hiruni Wijesekara", position: "SALES_STAFF", phone: "070-4040404", salary: 42000, joinedDate: "2024-01-08" },
  { employeeId: "EMP-0005", name: "Janaka Silva", position: "ACCOUNTANT", phone: "075-5050505", salary: 58000, joinedDate: "2022-11-01" },
  { employeeId: "EMP-0006", name: "Pavithra Madushani", position: "SALES_STAFF", phone: "078-6060606", salary: 42000, joinedDate: "2024-06-19" },
];

export const mockAttendance: Attendance[] = [
  { attendanceId: "ATT-0001", employeeId: "EMP-0001", employeeName: "Ruwan Jayasuriya", date: "2026-06-19", status: "PRESENT" },
  { attendanceId: "ATT-0002", employeeId: "EMP-0002", employeeName: "Sachini Kumari", date: "2026-06-19", status: "PRESENT" },
  { attendanceId: "ATT-0003", employeeId: "EMP-0003", employeeName: "Mahesh Gunaratne", date: "2026-06-19", status: "ABSENT" },
  { attendanceId: "ATT-0004", employeeId: "EMP-0004", employeeName: "Hiruni Wijesekara", date: "2026-06-19", status: "PRESENT" },
  { attendanceId: "ATT-0005", employeeId: "EMP-0005", employeeName: "Janaka Silva", date: "2026-06-19", status: "LEAVE" },
  { attendanceId: "ATT-0006", employeeId: "EMP-0006", employeeName: "Pavithra Madushani", date: "2026-06-19", status: "HALF_DAY" },
];

export const mockExpenses: Expense[] = [
  { expenseId: "EXP-0001", description: "Raw material purchase – Soy wax", amount: 45000, expenseDate: "2026-06-05", category: "Raw Materials" },
  { expenseId: "EXP-0002", description: "Electricity bill", amount: 18500, expenseDate: "2026-06-10", category: "Utilities" },
  { expenseId: "EXP-0003", description: "Staff salaries – June", amount: 317000, expenseDate: "2026-06-15", category: "Payroll" },
  { expenseId: "EXP-0004", description: "Packaging materials", amount: 22000, expenseDate: "2026-06-12", category: "Packaging" },
  { expenseId: "EXP-0005", description: "Delivery & transport", amount: 9500, expenseDate: "2026-06-17", category: "Logistics" },
];

export const mockRevenue: Revenue[] = [
  { revenueId: "REV-0001", saleId: "SAL-0001", amount: 5550, receivedDate: "2026-06-15" },
  { revenueId: "REV-0002", saleId: "SAL-0002", amount: 3100, receivedDate: "2026-06-16" },
  { revenueId: "REV-0003", saleId: "SAL-0005", amount: 4650, receivedDate: "2026-06-18" },
];
