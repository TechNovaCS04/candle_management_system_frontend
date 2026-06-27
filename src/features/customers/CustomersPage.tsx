import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Mail, Phone } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import CustomerFormModal from "./CustomerFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addCustomer, updateCustomer, removeCustomer, setCustomerSearch, setCustomerPage } from "../../reducers/customersSlice";
import type { Customer } from "../../types";
import { useEntityPage } from "../../lib/useEntityPage";

export default function CustomersPage() {
  const dispatch = useAppDispatch();
  const { items, searchTerm, page, pageSize } = useAppSelector((s) => s.customers);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Customer | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Customer | null>(null);

  const searchFields = useCallback((c: Customer) => [c.name, c.email, c.phone, c.customerId], []);
  const { paginated, totalItems } = useEntityPage(items, searchTerm, page, pageSize, searchFields);

  function handleSave(customer: Customer) {
    if (editTarget) dispatch(updateCustomer(customer));
    else dispatch(addCustomer(customer));
    setEditTarget(null);
  }

  const columns: Column<Customer>[] = [
    { header: "Customer ID", accessor: (c) => <span className="font-medium text-bronze-900">{c.customerId}</span> },
    { header: "Name", accessor: (c) => <span className="font-medium text-bronze-900">{c.name}</span> },
    {
      header: "Contact",
      accessor: (c) => (
        <div className="flex flex-col gap-0.5 text-xs text-bronze-500">
          <span className="flex items-center gap-1.5"><Phone size={11} /> {c.phone}</span>
          <span className="flex items-center gap-1.5"><Mail size={11} /> {c.email}</span>
        </div>
      ),
      hideOnMobile: true,
    },
    { header: "Address", accessor: (c) => <span className="text-bronze-600">{c.address}</span>, hideOnMobile: true },
    { header: "Orders", accessor: (c) => <span className="tabular">{c.totalOrders ?? 0}</span> },
  ];

  return (
    <div>
      <PageHeader
        title="Customers"
        subtitle="View and manage customer details and order history."
        action={
          <Button icon={<Plus size={16} />} onClick={() => { setEditTarget(null); setModalOpen(true); }}>
            Add Customer
          </Button>
        }
      />

      <Card className="p-5">
        <DataTable
          columns={columns}
          data={paginated}
          rowKey={(c) => c.customerId}
          searchTerm={searchTerm}
          onSearchChange={(v) => dispatch(setCustomerSearch(v))}
          searchPlaceholder="Search customers..."
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(p) => dispatch(setCustomerPage(p))}
          emptyMessage="No customers found."
          actions={(c) => (
            <>
              <button
                onClick={() => { setEditTarget(c); setModalOpen(true); }}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`Edit ${c.name}`}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => setDeleteTarget(c)}
                className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                aria-label={`Delete ${c.name}`}
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        />
      </Card>

      <CustomerFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && dispatch(removeCustomer(deleteTarget.customerId))}
        title="Delete Customer"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
