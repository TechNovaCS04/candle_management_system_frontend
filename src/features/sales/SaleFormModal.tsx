import { useState, useEffect, type FormEvent } from "react";
import { Plus, Trash2 } from "lucide-react";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Sale, SaleItem, SaleStatus } from "../../types";
import { generateId, formatCurrency } from "../../lib/utils";
import { useAppSelector } from "../../app/hooks";

const statuses: SaleStatus[] = ["PENDING", "PROCESSING", "COMPLETED", "CANCELLED"];

interface SaleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (sale: Sale) => void;
  initialData?: Sale | null;
}

export default function SaleFormModal({ isOpen, onClose, onSave, initialData }: SaleFormModalProps) {
  const customers = useAppSelector((s) => s.customers.items);
  const products = useAppSelector((s) => s.products.items);

  const [customerId, setCustomerId] = useState(customers[0]?.customerId || "");
  const [saleDate, setSaleDate] = useState(new Date().toISOString().slice(0, 10));
  const [status, setStatus] = useState<SaleStatus>("PENDING");
  const [items, setItems] = useState<SaleItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setCustomerId(initialData.customerId);
      setSaleDate(initialData.saleDate);
      setStatus(initialData.status);
      setItems(initialData.items);
    } else {
      setCustomerId(customers[0]?.customerId || "");
      setSaleDate(new Date().toISOString().slice(0, 10));
      setStatus("PENDING");
      setItems([
        {
          saleItemId: generateId("SI"),
          saleId: "",
          productId: products[0]?.productId || "",
          productName: products[0]?.name,
          quantity: 1,
          unitPrice: products[0]?.price || 0,
        },
      ]);
    }
    setErrors({});
  }, [initialData, isOpen, customers, products]);

  function addLineItem() {
    setItems((prev) => [
      ...prev,
      {
        saleItemId: generateId("SI"),
        saleId: "",
        productId: products[0]?.productId || "",
        productName: products[0]?.name,
        quantity: 1,
        unitPrice: products[0]?.price || 0,
      },
    ]);
  }

  function updateLineItem(idx: number, productId: string) {
    const product = products.find((p) => p.productId === productId);
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, productId, productName: product?.name, unitPrice: product?.price || 0 } : item
      )
    );
  }

  function updateQuantity(idx: number, qty: number) {
    setItems((prev) => prev.map((item, i) => (i === idx ? { ...item, quantity: qty } : item)));
  }

  function removeLineItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  const total = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);

  function validate() {
    const next: Record<string, string> = {};
    if (!customerId) next.customerId = "Select a customer";
    if (!saleDate) next.saleDate = "Sale date is required";
    if (items.length === 0) next.items = "Add at least one product";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const customer = customers.find((c) => c.customerId === customerId);
    const saleId = initialData?.saleId || generateId("SAL");
    onSave({
      saleId,
      customerId,
      customerName: customer?.name,
      saleDate,
      status,
      totalAmount: total,
      items: items.map((i) => ({ ...i, saleId })),
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Order" : "Create New Order"}
      subtitle={initialData ? `Editing ${initialData.saleId}` : "Record a new sale"}
      size="lg"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Customer"
            required
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            options={customers.map((c) => ({ value: c.customerId, label: c.name }))}
            error={errors.customerId}
          />
          <Input
            label="Sale Date"
            type="date"
            required
            value={saleDate}
            onChange={(e) => setSaleDate(e.target.value)}
            error={errors.saleDate}
          />
          <Select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value as SaleStatus)}
            options={statuses.map((s) => ({ value: s, label: s }))}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-bronze-800">Order Items</label>
            <button
              type="button"
              onClick={addLineItem}
              className="text-sm font-medium text-bronze-600 hover:text-bronze-800 flex items-center gap-1"
            >
              <Plus size={14} /> Add item
            </button>
          </div>
          {errors.items && <p className="text-xs text-ember-500 mb-2">{errors.items}</p>}

          <div className="flex flex-col gap-2 max-h-[240px] overflow-y-auto pr-1">
            {items.map((item, idx) => (
              <div key={item.saleItemId} className="flex items-end gap-2 bg-cream-100 rounded-lg p-2.5">
                <div className="flex-1">
                  <Select
                    value={item.productId}
                    onChange={(e) => updateLineItem(idx, e.target.value)}
                    options={products.map((p) => ({ value: p.productId, label: p.name }))}
                  />
                </div>
                <div className="w-20">
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(idx, parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="w-28 text-sm text-bronze-700 pb-2.5 text-right tabular flex-shrink-0">
                  {formatCurrency(item.quantity * item.unitPrice)}
                </div>
                <button
                  type="button"
                  onClick={() => removeLineItem(idx)}
                  className="p-2 text-ember-500 hover:bg-ember-100 rounded-lg flex-shrink-0"
                  aria-label="Remove item"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-3 pt-3 border-t border-wax-200">
            <p className="text-base font-semibold text-bronze-900">
              Total: <span className="tabular">{formatCurrency(total)}</span>
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Create Order"}</Button>
        </div>
      </form>
    </Modal>
  );
}
