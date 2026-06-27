import { useMemo } from "react";
import {
  Wallet,
  ShoppingCart,
  Package,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import PageHeader from "../../components/ui/PageHeader";
import { Card, Badge } from "../../components/ui/Card";
import StatCard from "./StatCard";
import { useAppSelector } from "../../app/hooks";
import { formatCurrency, formatDate } from "../../lib/utils";

const salesTrend = [
  { day: "Mon", sales: 12500 },
  { day: "Tue", sales: 9800 },
  { day: "Wed", sales: 15200 },
  { day: "Thu", sales: 11000 },
  { day: "Fri", sales: 18400 },
  { day: "Sat", sales: 24100 },
  { day: "Sun", sales: 16700 },
];

const productionByCategory = [
  { category: "Jar Candles", batches: 8 },
  { category: "Pillar Candles", batches: 5 },
  { category: "Votives", batches: 4 },
  { category: "Travel Tins", batches: 6 },
];

const PIE_COLORS = ["#B5651D", "#2F6B4F", "#C98A12", "#A23B2E"];

export default function DashboardPage() {
  const products = useAppSelector((s) => s.products.items);
  const rawMaterials = useAppSelector((s) => s.rawMaterials.items);
  const sales = useAppSelector((s) => s.sales.items);
  const expenses = useAppSelector((s) => s.expenses.items);
  const revenue = useAppSelector((s) => s.revenue.items);
  const customers = useAppSelector((s) => s.customers.items);

  const totalRevenue = useMemo(() => revenue.reduce((sum, r) => sum + r.amount, 0), [revenue]);
  const totalExpenses = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);
  const profit = totalRevenue - totalExpenses;
  const lowStockMaterials = useMemo(
    () => rawMaterials.filter((m) => m.quantityInStock <= m.reorderLevel),
    [rawMaterials]
  );
  const lowStockProducts = useMemo(() => products.filter((p) => p.stockQuantity <= 10), [products]);
  const pendingSales = sales.filter((s) => s.status === "PENDING" || s.status === "PROCESSING");

  const orderStatusData = useMemo(() => {
    const counts: Record<string, number> = {};
    sales.forEach((s) => {
      counts[s.status] = (counts[s.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [sales]);

  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back — here's how Sangeetha Candles is doing today."
      />

      {/* KPI row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          label="Total Revenue"
          value={formatCurrency(totalRevenue)}
          icon={<Wallet size={18} />}
          trend={12.4}
          trendLabel="vs last month"
          accent="sage"
        />
        <StatCard
          label="Net Profit"
          value={formatCurrency(profit)}
          icon={<TrendingUp size={18} />}
          trend={8.1}
          trendLabel="vs last month"
          accent="bronze"
        />
        <StatCard
          label="Active Orders"
          value={String(pendingSales.length)}
          icon={<ShoppingCart size={18} />}
          accent="amber"
          trendLabel="awaiting fulfillment"
        />
        <StatCard
          label="Total Customers"
          value={String(customers.length)}
          icon={<Package size={18} />}
          trend={5.6}
          trendLabel="vs last month"
          accent="bronze"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-display text-base font-semibold text-bronze-900">Sales This Week</h3>
              <p className="text-xs text-bronze-400 mt-0.5">Revenue trend, last 7 days</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={salesTrend} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#B5651D" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#B5651D" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC8" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#7A4A2B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#7A4A2B" }} axisLine={false} tickLine={false} width={50} />
              <Tooltip
                formatter={(value) => formatCurrency(Number(value ?? 0))}
                contentStyle={{
                  borderRadius: 10,
                  border: "1px solid #E8DCC8",
                  fontSize: 13,
                  background: "#FEFCF9",
                }}
              />
              <Area type="monotone" dataKey="sales" stroke="#B5651D" strokeWidth={2.5} fill="url(#salesGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <h3 className="font-display text-base font-semibold text-bronze-900 mb-0.5">Order Status</h3>
          <p className="text-xs text-bronze-400 mb-4">Breakdown of current orders</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={orderStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
              >
                {orderStatusData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E8DCC8", fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2 justify-center">
            {orderStatusData.map((entry, i) => (
              <span key={entry.name} className="flex items-center gap-1.5 text-xs text-bronze-600">
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: PIE_COLORS[i % PIE_COLORS.length] }}
                />
                {entry.name}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <Card className="lg:col-span-2 p-5">
          <h3 className="font-display text-base font-semibold text-bronze-900 mb-0.5">
            Production by Category
          </h3>
          <p className="text-xs text-bronze-400 mb-4">Batches produced this month</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={productionByCategory} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC8" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 12, fill: "#7A4A2B" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#7A4A2B" }} axisLine={false} tickLine={false} width={30} />
              <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #E8DCC8", fontSize: 13 }} />
              <Bar dataKey="batches" fill="#C98A4B" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Low stock alerts */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-ember-500" />
            <h3 className="font-display text-base font-semibold text-bronze-900">Low Stock Alerts</h3>
          </div>
          <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto">
            {lowStockMaterials.length === 0 && lowStockProducts.length === 0 && (
              <p className="text-sm text-bronze-400">All stock levels are healthy.</p>
            )}
            {lowStockMaterials.map((m) => (
              <div key={m.materialId} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-bronze-800 font-medium">{m.name}</p>
                  <p className="text-xs text-bronze-400">Raw material</p>
                </div>
                <Badge tone="danger">{m.quantityInStock} {m.unit} left</Badge>
              </div>
            ))}
            {lowStockProducts.map((p) => (
              <div key={p.productId} className="flex items-center justify-between text-sm">
                <div>
                  <p className="text-bronze-800 font-medium">{p.name}</p>
                  <p className="text-xs text-bronze-400">Finished product</p>
                </div>
                <Badge tone={p.stockQuantity === 0 ? "danger" : "warning"}>
                  {p.stockQuantity === 0 ? "Out of stock" : `${p.stockQuantity} left`}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent sales table */}
      <Card className="p-5">
        <h3 className="font-display text-base font-semibold text-bronze-900 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-wax-200">
                <th className="text-left font-semibold text-bronze-700 px-3 py-2">Order ID</th>
                <th className="text-left font-semibold text-bronze-700 px-3 py-2">Customer</th>
                <th className="text-left font-semibold text-bronze-700 px-3 py-2">Date</th>
                <th className="text-left font-semibold text-bronze-700 px-3 py-2">Amount</th>
                <th className="text-left font-semibold text-bronze-700 px-3 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {sales.slice(0, 5).map((sale) => (
                <tr key={sale.saleId} className="border-b border-wax-100 last:border-0">
                  <td className="px-3 py-3 text-bronze-800 font-medium">{sale.saleId}</td>
                  <td className="px-3 py-3 text-bronze-600">{sale.customerName}</td>
                  <td className="px-3 py-3 text-bronze-500">{formatDate(sale.saleDate)}</td>
                  <td className="px-3 py-3 text-bronze-800 tabular">{formatCurrency(sale.totalAmount)}</td>
                  <td className="px-3 py-3">
                    <Badge
                      tone={
                        sale.status === "COMPLETED"
                          ? "success"
                          : sale.status === "CANCELLED"
                          ? "danger"
                          : sale.status === "PENDING"
                          ? "warning"
                          : "info"
                      }
                    >
                      {sale.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
