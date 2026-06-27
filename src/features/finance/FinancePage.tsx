import { useState, useCallback, useMemo } from "react";
import { Plus, Pencil, Trash2, Wallet, TrendingDown, TrendingUp } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import StatCard from "../dashboard/StatCard";
import ExpenseFormModal from "./ExpenseFormModal";
import RevenueFormModal from "./RevenueFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addExpense, updateExpense, removeExpense, setExpenseSearch, setExpensePage } from "../../reducers/expensesSlice";
import { addRevenue, updateRevenue, removeRevenue, setRevenueSearch, setRevenuePage } from "../../reducers/revenueSlice";
import type { Expense, Revenue } from "../../types";
import { formatCurrency, formatDate } from "../../lib/utils";
import { useEntityPage } from "../../lib/useEntityPage";

export default function FinancePage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("revenue");

  const revenueState = useAppSelector((s) => s.revenue);
  const expenseState = useAppSelector((s) => s.expenses);

  const totalRevenue = useMemo(() => revenueState.items.reduce((sum, r) => sum + r.amount, 0), [revenueState.items]);
  const totalExpenses = useMemo(() => expenseState.items.reduce((sum, e) => sum + e.amount, 0), [expenseState.items]);
  const profit = totalRevenue - totalExpenses;

  // Revenue tab state
  const [revModalOpen, setRevModalOpen] = useState(false);
  const [revEditTarget, setRevEditTarget] = useState<Revenue | null>(null);
  const [revDeleteTarget, setRevDeleteTarget] = useState<Revenue | null>(null);
  const revSearchFields = useCallback((r: Revenue) => [r.revenueId, r.saleId], []);
  const revPaged = useEntityPage(
    revenueState.items,
    revenueState.searchTerm,
    revenueState.page,
    revenueState.pageSize,
    revSearchFields
  );

  // Expense tab state
  const [expModalOpen, setExpModalOpen] = useState(false);
  const [expEditTarget, setExpEditTarget] = useState<Expense | null>(null);
  const [expDeleteTarget, setExpDeleteTarget] = useState<Expense | null>(null);
  const expSearchFields = useCallback((e: Expense) => [e.description, e.category || "", e.expenseId], []);
  const expPaged = useEntityPage(
    expenseState.items,
    expenseState.searchTerm,
    expenseState.page,
    expenseState.pageSize,
    expSearchFields
  );

  const revenueColumns: Column<Revenue>[] = [
    { header: "Revenue ID", accessor: (r) => <span className="font-medium text-bronze-900">{r.revenueId}</span> },
    { header: "Sale Reference", accessor: (r) => r.saleId },
    { header: "Amount", accessor: (r) => <span className="tabular text-sage-700 font-medium">{formatCurrency(r.amount)}</span> },
    { header: "Date Received", accessor: (r) => formatDate(r.receivedDate) },
  ];

  const expenseColumns: Column<Expense>[] = [
    { header: "Expense ID", accessor: (e) => <span className="font-medium text-bronze-900">{e.expenseId}</span> },
    { header: "Description", accessor: (e) => e.description },
    { header: "Category", accessor: (e) => e.category, hideOnMobile: true },
    { header: "Amount", accessor: (e) => <span className="tabular text-ember-600 font-medium">{formatCurrency(e.amount)}</span> },
    { header: "Date", accessor: (e) => formatDate(e.expenseDate) },
  ];

  return (
    <div>
      <PageHeader
        title="Finance"
        subtitle="Track revenue, expenses, and overall profitability."
        action={
          activeTab === "revenue" ? (
            <Button icon={<Plus size={16} />} onClick={() => { setRevEditTarget(null); setRevModalOpen(true); }}>
              Record Revenue
            </Button>
          ) : (
            <Button icon={<Plus size={16} />} onClick={() => { setExpEditTarget(null); setExpModalOpen(true); }}>
              Record Expense
            </Button>
          )
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard label="Total Revenue" value={formatCurrency(totalRevenue)} icon={<TrendingUp size={18} />} accent="sage" />
        <StatCard label="Total Expenses" value={formatCurrency(totalExpenses)} icon={<TrendingDown size={18} />} accent="ember" />
        <StatCard label="Net Profit" value={formatCurrency(profit)} icon={<Wallet size={18} />} accent="bronze" />
      </div>

      <Tabs
        tabs={[
          { id: "revenue", label: "Revenue" },
          { id: "expenses", label: "Expenses" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Card className="p-5">
        {activeTab === "revenue" ? (
          <DataTable
            columns={revenueColumns}
            data={revPaged.paginated}
            rowKey={(r) => r.revenueId}
            searchTerm={revenueState.searchTerm}
            onSearchChange={(v) => dispatch(setRevenueSearch(v))}
            searchPlaceholder="Search revenue records..."
            page={revenueState.page}
            pageSize={revenueState.pageSize}
            totalItems={revPaged.totalItems}
            onPageChange={(p) => dispatch(setRevenuePage(p))}
            emptyMessage="No revenue records found."
            actions={(r) => (
              <>
                <button
                  onClick={() => { setRevEditTarget(r); setRevModalOpen(true); }}
                  className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                  aria-label="Edit revenue record"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setRevDeleteTarget(r)}
                  className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                  aria-label="Delete revenue record"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          />
        ) : (
          <DataTable
            columns={expenseColumns}
            data={expPaged.paginated}
            rowKey={(e) => e.expenseId}
            searchTerm={expenseState.searchTerm}
            onSearchChange={(v) => dispatch(setExpenseSearch(v))}
            searchPlaceholder="Search expenses..."
            page={expenseState.page}
            pageSize={expenseState.pageSize}
            totalItems={expPaged.totalItems}
            onPageChange={(p) => dispatch(setExpensePage(p))}
            emptyMessage="No expense records found."
            actions={(e) => (
              <>
                <button
                  onClick={() => { setExpEditTarget(e); setExpModalOpen(true); }}
                  className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                  aria-label="Edit expense"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setExpDeleteTarget(e)}
                  className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                  aria-label="Delete expense"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          />
        )}
      </Card>

      <RevenueFormModal
        isOpen={revModalOpen}
        onClose={() => setRevModalOpen(false)}
        onSave={(rev) => {
          if (revEditTarget) dispatch(updateRevenue(rev));
          else dispatch(addRevenue(rev));
          setRevEditTarget(null);
        }}
        initialData={revEditTarget}
      />
      <ConfirmDialog
        isOpen={!!revDeleteTarget}
        onClose={() => setRevDeleteTarget(null)}
        onConfirm={() => revDeleteTarget && dispatch(removeRevenue(revDeleteTarget.revenueId))}
        title="Delete Revenue Record"
        message="Are you sure you want to delete this revenue record? This action cannot be undone."
      />

      <ExpenseFormModal
        isOpen={expModalOpen}
        onClose={() => setExpModalOpen(false)}
        onSave={(exp) => {
          if (expEditTarget) dispatch(updateExpense(exp));
          else dispatch(addExpense(exp));
          setExpEditTarget(null);
        }}
        initialData={expEditTarget}
      />
      <ConfirmDialog
        isOpen={!!expDeleteTarget}
        onClose={() => setExpDeleteTarget(null)}
        onConfirm={() => expDeleteTarget && dispatch(removeExpense(expDeleteTarget.expenseId))}
        title="Delete Expense Record"
        message="Are you sure you want to delete this expense record? This action cannot be undone."
      />
    </div>
  );
}
