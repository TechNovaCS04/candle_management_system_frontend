import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import SupplierFormModal from "./SupplierFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addSupplier, updateSupplier, removeSupplier, setSupplierSearch, setSupplierPage } from "../../reducers/suppliersSlice";
import type { Supplier } from "../../types";
import { useEntityPage } from "../../lib/useEntityPage";

export default function SuppliersPage() {
  const dispatch = useAppDispatch();
  const { items, searchTerm, page, pageSize } = useAppSelector((s) => s.suppliers);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Supplier | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Supplier | null>(null);

  const searchFields = useCallback((s: Supplier) => [s.name, s.email, s.contactNo, s.supplierId], []);
  const { paginated, totalItems } = useEntityPage(items, searchTerm, page, pageSize, searchFields);

  function handleSave(supplier: Supplier) {
    if (editTarget) dispatch(updateSupplier(supplier));
    else dispatch(addSupplier(supplier));
    setEditTarget(null);
  }

  const columns: Column<Supplier>[] = [
    { header: "Supplier ID", accessor: (s) => <span className="font-medium text-bronze-900">{s.supplierId}</span> },
    { header: "Name", accessor: (s) => <span className="font-medium text-bronze-900">{s.name}</span> },
    {
      header: "Contact",
      accessor: (s) => (
        <div className="flex flex-col gap-0.5 text-xs text-bronze-500">
          <span className="flex items-center gap-1.5"><Phone size={11} /> {s.contactNo}</span>
          <span className="flex items-center gap-1.5"><Mail size={11} /> {s.email}</span>
        </div>
      ),
      hideOnMobile: true,
    },
    { header: "Address", accessor: (s) => <span className="text-bronze-600">{s.address}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Suppliers"
        subtitle="Manage suppliers and raw material sourcing."
        action={
          <Button icon={<Plus size={16} />} onClick={() => { setEditTarget(null); setModalOpen(true); }}>
            Add Supplier
          </Button>
        }
      />

      <Card className="p-5">
        <DataTable
          columns={columns}
          data={paginated}
          rowKey={(s) => s.supplierId}
          searchTerm={searchTerm}
          onSearchChange={(v) => dispatch(setSupplierSearch(v))}
          searchPlaceholder="Search suppliers..."
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(p) => dispatch(setSupplierPage(p))}
          emptyMessage="No suppliers found."
          actions={(s) => (
            <>
              <button
                onClick={() => { setEditTarget(s); setModalOpen(true); }}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`Edit ${s.name}`}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => setDeleteTarget(s)}
                className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                aria-label={`Delete ${s.name}`}
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        />
      </Card>

      <SupplierFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && dispatch(removeSupplier(deleteTarget.supplierId))}
        title="Delete Supplier"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
