import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card, Badge } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import ProductFormModal from "./ProductFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addProduct, updateProduct, removeProduct, setProductSearch, setProductPage } from "../../reducers/productsSlice";
import type { Product } from "../../types";
import { formatCurrency } from "../../lib/utils";
import { useEntityPage } from "../../lib/useEntityPage";

export default function ProductsPage() {
  const dispatch = useAppDispatch();
  const { items, searchTerm, page, pageSize } = useAppSelector((s) => s.products);

  const [modalOpen, setModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Product | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const searchFields = useCallback((p: Product) => [p.name, p.category || "", p.productId], []);
  const { paginated, totalItems } = useEntityPage(items, searchTerm, page, pageSize, searchFields);

  function handleSave(product: Product) {
    if (editTarget) dispatch(updateProduct(product));
    else dispatch(addProduct(product));
    setEditTarget(null);
  }

  const columns: Column<Product>[] = [
    { header: "Product ID", accessor: (p) => <span className="font-medium text-bronze-900">{p.productId}</span> },
    {
      header: "Name",
      accessor: (p) => (
        <div>
          <p className="font-medium text-bronze-900">{p.name}</p>
          <p className="text-xs text-bronze-400 line-clamp-1 max-w-xs">{p.description}</p>
        </div>
      ),
    },
    { header: "Category", accessor: (p) => p.category, hideOnMobile: true },
    { header: "Price", accessor: (p) => <span className="tabular">{formatCurrency(p.price)}</span> },
    {
      header: "Stock",
      accessor: (p) =>
        p.stockQuantity === 0 ? (
          <Badge tone="danger">Out of stock</Badge>
        ) : p.stockQuantity <= 10 ? (
          <Badge tone="warning">{p.stockQuantity} units</Badge>
        ) : (
          <Badge tone="success">{p.stockQuantity} units</Badge>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Products"
        subtitle="Manage your finished candle inventory."
        action={
          <Button icon={<Plus size={16} />} onClick={() => { setEditTarget(null); setModalOpen(true); }}>
            Add Product
          </Button>
        }
      />

      <Card className="p-5">
        <DataTable
          columns={columns}
          data={paginated}
          rowKey={(p) => p.productId}
          searchTerm={searchTerm}
          onSearchChange={(v) => dispatch(setProductSearch(v))}
          searchPlaceholder="Search products..."
          page={page}
          pageSize={pageSize}
          totalItems={totalItems}
          onPageChange={(p) => dispatch(setProductPage(p))}
          emptyMessage="No products found. Add your first product to get started."
          actions={(p) => (
            <>
              <button
                onClick={() => { setEditTarget(p); setModalOpen(true); }}
                className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                aria-label={`Edit ${p.name}`}
              >
                <Pencil size={15} />
              </button>
              <button
                onClick={() => setDeleteTarget(p)}
                className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                aria-label={`Delete ${p.name}`}
              >
                <Trash2 size={15} />
              </button>
            </>
          )}
        />
      </Card>

      <ProductFormModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editTarget}
      />

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => deleteTarget && dispatch(removeProduct(deleteTarget.productId))}
        title="Delete Product"
        message={`Are you sure you want to delete "${deleteTarget?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
