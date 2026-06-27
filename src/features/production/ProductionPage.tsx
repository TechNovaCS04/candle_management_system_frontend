import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card, Badge } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import BatchFormModal from "./BatchFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addBatch, updateBatch, removeBatch, setBatchSearch, setBatchPage } from "../../reducers/productionSlice";
import type { ProductionBatch, ProductionStatus } from "../../types";
import { formatDate } from "../../lib/utils";
import { useEntityPage } from "../../lib/useEntityPage";

const statusTone: Record<ProductionStatus, "neutral" | "success" | "warning" | "danger" | "info"> = {
  PLANNED: "neutral",
  IN_PROGRESS: "info",
  COMPLETED: "success",
  CANCELLED: "danger",
};

export default function ProductionPage() {
  const dispatch = useAppDispatch();
  const { items, searchTerm, page, pageSize } = useAppSelector((s) => s.production);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<ProductionBatch | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductionBatch | null>(null);

  const searchFields = useCallback((b: ProductionBatch) => [b.productName || "", b.batchId, b.status], []);
  const { paginated, totalItems } = useEntityPage(items, searchTerm, page, pageSize, searchFields);

  function handleSave(batch: ProductionBatch) {
    if (editTarget) dispatch(updateBatch(batch));
    else dispatch(addBatch(batch));
    setEditTarget(null);
  }

  const columns: Column<ProductionBatch>[] = [
    { header: "Batch ID", accessor: (b) => <span className="font-medium text-bronze-900">{b.batchId}</span> },
    { header: "Product", accessor: (b) => <span className="font-medium text-bronze-900">{b.productName}</span> },
    { header: "Production Date", accessor: (b) => formatDate(b.productionDate), hideOnMobile: true },
    { header: "Qty Produced", accessor: (b) => <span className="tabular">{b.quantityProduced}</span> },
    {
      header: "Status",
      accessor: (b) => <Badge tone={statusTone[b.status]}>{b.status.replace("_", " ")}</Badge>,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Production"
        subtitle="Schedule and track candle production batches."
        action={
          <Button icon={<Plus size={16} />} onClick={() => { setEditTarget(null); setModalOpen(true); }}>
            Schedule Batch
          </Button>
        }
      />

      <Card className="p-5">
        <DataTable
          columns={columns}
          data={paginated}
          rowKey={(b) => b.batchId}
          searchTerm={searchTerm}
          onSearchChange={(v) => dispatch(setBatchSearch(v))}
          searchPlaceholder="Search production batches..."
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(p) => dispatch(setBatchPage(p))}
          emptyMessage="No production batches found."
          actions={(b) => (
            <>
              <button
                onClick={() => { setEditTarget(b); setModalOpen(true); }}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`Edit batch ${b.batchId}`}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => setDeleteTarget(b)}
                className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                aria-label={`Delete batch ${b.batchId}`}
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        />
      </Card>

      <BatchFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && dispatch(removeBatch(deleteTarget.batchId))}
        title="Delete Production Batch"
        message={`Are you sure you want to delete batch "${deleteTarget?.batchId}"? This action cannot be undone.`}
      />
    </div>
  );
}
