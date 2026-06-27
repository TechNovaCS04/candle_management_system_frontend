import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, AlertTriangle } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card, Badge } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import RawMaterialFormModal from "./RawMaterialFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addRawMaterial,
  updateRawMaterial,
  removeRawMaterial,
  setRawMaterialSearch,
  setRawMaterialPage,
} from "../../reducers/rawMaterialsSlice";
import type { RawMaterial } from "../../types";
import { useEntityPage } from "../../lib/useEntityPage";

export default function RawMaterialsPage() {
  const dispatch = useAppDispatch();
  const { items, searchTerm, page, pageSize } = useAppSelector((s) => s.rawMaterials);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<RawMaterial | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<RawMaterial | null>(null);

  const searchFields = useCallback((m: RawMaterial) => [m.name, m.supplierName || "", m.materialId], []);
  const { paginated, totalItems } = useEntityPage(items, searchTerm, page, pageSize, searchFields);
  const lowStockCount = items.filter((m) => m.quantityInStock <= m.reorderLevel).length;

  function handleSave(material: RawMaterial) {
    if (editTarget) dispatch(updateRawMaterial(material));
    else dispatch(addRawMaterial(material));
    setEditTarget(null);
  }

  const columns: Column<RawMaterial>[] = [
    { header: "Material ID", accessor: (m) => <span className="font-medium text-bronze-900">{m.materialId}</span> },
    { header: "Name", accessor: (m) => <span className="font-medium text-bronze-900">{m.name}</span> },
    { header: "Supplier", accessor: (m) => m.supplierName, hideOnMobile: true },
    {
      header: "Stock",
      accessor: (m) => (
        <span className="tabular">
          {m.quantityInStock} {m.unit}
        </span>
      ),
    },
    {
      header: "Status",
      accessor: (m) =>
        m.quantityInStock <= m.reorderLevel ? (
          <Badge tone="danger" icon={<AlertTriangle size={11} />}>
            Reorder now
          </Badge>
        ) : (
          <Badge tone="success">Sufficient</Badge>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Raw Materials"
        subtitle="Track wax, fragrance oils, dyes, wicks, and containers."
        action={
          <Button icon={<Plus size={16} />} onClick={() => { setEditTarget(null); setModalOpen(true); }}>
            Add Material
          </Button>
        }
      />

      {lowStockCount > 0 && (
        <div className="flex items-center gap-2.5 bg-ember-100 text-ember-700 rounded-xl px-4 py-3 mb-5 text-sm">
          <AlertTriangle size={16} className="flex-shrink-0" />
          <span>
            <strong>{lowStockCount}</strong> material{lowStockCount > 1 ? "s are" : " is"} at or below reorder level. Consider restocking soon.
          </span>
        </div>
      )}

      <Card className="p-5">
        <DataTable
          columns={columns}
          data={paginated}
          rowKey={(m) => m.materialId}
          searchTerm={searchTerm}
          onSearchChange={(v) => dispatch(setRawMaterialSearch(v))}
          searchPlaceholder="Search raw materials..."
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(p) => dispatch(setRawMaterialPage(p))}
          emptyMessage="No raw materials found."
          actions={(m) => (
            <>
              <button
                onClick={() => { setEditTarget(m); setModalOpen(true); }}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`Edit ${m.name}`}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => setDeleteTarget(m)}
                className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                aria-label={`Delete ${m.name}`}
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        />
      </Card>

      <RawMaterialFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && dispatch(removeRawMaterial(deleteTarget.materialId))}
        title="Delete Raw Material"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
