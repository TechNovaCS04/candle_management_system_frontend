import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { ProductionBatch, ProductionStatus } from "../../types";
import { generateId } from "../../lib/utils";
import { useAppSelector } from "../../app/hooks";

const statuses: ProductionStatus[] = ["PLANNED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

interface BatchFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (batch: ProductionBatch) => void;
  initialData?: ProductionBatch | null;
}

export default function BatchFormModal({ isOpen, onClose, onSave, initialData }: BatchFormModalProps) {
  const products = useAppSelector((s) => s.products.items);
  const [form, setForm] = useState({
    productId: products[0]?.productId || "",
    productionDate: new Date().toISOString().slice(0, 10),
    quantityProduced: 0,
    status: "PLANNED" as ProductionStatus,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm({
        productId: initialData.productId,
        productionDate: initialData.productionDate,
        quantityProduced: initialData.quantityProduced,
        status: initialData.status,
      });
    } else {
      setForm({
        productId: products[0]?.productId || "",
        productionDate: new Date().toISOString().slice(0, 10),
        quantityProduced: 0,
        status: "PLANNED",
      });
    }
    setErrors({});
  }, [initialData, isOpen, products]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.productId) next.productId = "Select a product";
    if (!form.productionDate) next.productionDate = "Production date is required";
    if (form.quantityProduced < 0) next.quantityProduced = "Cannot be negative";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const product = products.find((p) => p.productId === form.productId);
    onSave({
      batchId: initialData?.batchId || generateId("BAT"),
      ...form,
      productName: product?.name,
      materialsUsed: initialData?.materialsUsed || [],
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Production Batch" : "Schedule New Batch"}
      subtitle={initialData ? `Editing ${initialData.batchId}` : "Plan a new production run"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Select
          label="Product"
          required
          value={form.productId}
          onChange={(e) => setForm((f) => ({ ...f, productId: e.target.value }))}
          options={products.map((p) => ({ value: p.productId, label: p.name }))}
          error={errors.productId}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Production Date"
            type="date"
            required
            value={form.productionDate}
            onChange={(e) => setForm((f) => ({ ...f, productionDate: e.target.value }))}
            error={errors.productionDate}
          />
          <Input
            label="Quantity to Produce"
            type="number"
            required
            min={0}
            value={form.quantityProduced || ""}
            onChange={(e) => setForm((f) => ({ ...f, quantityProduced: parseInt(e.target.value) || 0 }))}
            error={errors.quantityProduced}
          />
        </div>
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as ProductionStatus }))}
          options={statuses.map((s) => ({ value: s, label: s.replace("_", " ") }))}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Schedule Batch"}</Button>
        </div>
      </form>
    </Modal>
  );
}
