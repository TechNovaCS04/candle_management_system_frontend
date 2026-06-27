import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Eye } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card, Badge } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import Modal from "../../components/ui/Modal";
import SaleFormModal from "./SaleFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addSale, updateSale, removeSale, setSaleSearch, setSalePage } from "../../reducers/salesSlice";
import type { Sale, SaleStatus } from "../../types";
import { formatCurrency, formatDate } from "../../lib/utils";
import { useEntityPage } from "../../lib/useEntityPage";

const statusTone: Record<SaleStatus, "neutral" | "success" | "warning" | "danger" | "info"> = {
  PENDING: "warning",
  PROCESSING: "info",
  COMPLETED: "success",
  CANCELLED: "danger",
};

export default function SalesPage() {
  const dispatch = useAppDispatch();
  const { items, searchTerm, page, pageSize } = useAppSelector((s) => s.sales);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Sale | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Sale | null>(null);
  const [viewTarget, setViewTarget] = useState<Sale | null>(null);

  const searchFields = useCallback((s: Sale) => [s.customerName || "", s.saleId, s.status], []);
  const { paginated, totalItems } = useEntityPage(items, searchTerm, page, pageSize, searchFields);

  function handleSave(sale: Sale) {
    if (editTarget) dispatch(updateSale(sale));
    else dispatch(addSale(sale));
    setEditTarget(null);
  }

  const columns: Column<Sale>[] = [
    { header: "Order ID", accessor: (s) => <span className="font-medium text-bronze-900">{s.saleId}</span> },
    { header: "Customer", accessor: (s) => s.customerName },
    { header: "Date", accessor: (s) => formatDate(s.saleDate), hideOnMobile: true },
    { header: "Items", accessor: (s) => s.items.length, hideOnMobile: true },
    { header: "Total", accessor: (s) => <span className="tabular">{formatCurrency(s.totalAmount)}</span> },
    { header: "Status", accessor: (s) => <Badge tone={statusTone[s.status]}>{s.status}</Badge> },
  ];

  return (
    <div>
      <PageHeader
        title="Sales & Orders"
        subtitle="Manage customer orders, invoicing, and order status."
        action={
          <Button icon={<Plus size={16} />} onClick={() => { setEditTarget(null); setModalOpen(true); }}>
            New Order
          </Button>
        }
      />

      <Card className="p-5">
        <DataTable
          columns={columns}
          data={paginated}
          rowKey={(s) => s.saleId}
          searchTerm={searchTerm}
          onSearchChange={(v) => dispatch(setSaleSearch(v))}
          searchPlaceholder="Search orders..."
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(p) => dispatch(setSalePage(p))}
          emptyMessage="No orders found."
          actions={(s) => (
            <>
              <button
                onClick={() => setViewTarget(s)}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`View order ${s.saleId}`}
              >
                <Eye size={15} />
              </button>
              <button
                onClick={() => { setEditTarget(s); setModalOpen(true); }}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`Edit order ${s.saleId}`}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => setDeleteTarget(s)}
                className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                aria-label={`Delete order ${s.saleId}`}
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        />
      </Card>

      <SaleFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />

      {viewTarget && (
        <Modal isOpen={!!viewTarget} onClose={() => setViewTarget(null)} title={`Order ${viewTarget.saleId}`} subtitle={viewTarget.customerName}>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between text-sm">
              <span className="text-bronze-500">Date</span>
              <span className="text-bronze-800 font-medium">{formatDate(viewTarget.saleDate)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-bronze-500">Status</span>
              <Badge tone={statusTone[viewTarget.status]}>{viewTarget.status}</Badge>
            </div>
            <div className="h-px bg-wax-200 my-1" />
            {viewTarget.items.map((item) => (
              <div key={item.saleItemId} className="flex justify-between text-sm">
                <span className="text-bronze-700">
                  {item.productName} <span className="text-bronze-400">× {item.quantity}</span>
                </span>
                <span className="text-bronze-800 tabular">{formatCurrency(item.quantity * item.unitPrice)}</span>
              </div>
            ))}
            <div className="h-px bg-wax-200 my-1" />
            <div className="flex justify-between text-base font-semibold text-bronze-900">
              <span>Total</span>
              <span className="tabular">{formatCurrency(viewTarget.totalAmount)}</span>
            </div>
          </div>
        </Modal>
      )}

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && dispatch(removeSale(deleteTarget.saleId))}
        title="Delete Order"
        message={`Are you sure you want to delete order "${deleteTarget?.saleId}"? This action cannot be undone.`}
      />
    </div>
  );
}
