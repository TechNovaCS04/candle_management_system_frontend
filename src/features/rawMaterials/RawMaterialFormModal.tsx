import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { RawMaterial } from "../../types";
import { generateId } from "../../lib/utils";
import { useAppSelector } from "../../app/hooks";

const units = ["kg", "litre", "pcs", "g", "ml"];

interface RawMaterialFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (material: RawMaterial) => void;
  initialData?: RawMaterial | null;
}

export default function RawMaterialFormModal({ isOpen, onClose, onSave, initialData }: RawMaterialFormModalProps) {
  const suppliers = useAppSelector((s) => s.suppliers.items);
  const [form, setForm] = useState<Omit<RawMaterial, "materialId">>({
    name: "",
    unit: units[0],
    quantityInStock: 0,
    reorderLevel: 0,
    supplierId: suppliers[0]?.supplierId || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { materialId, supplierName, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({ name: "", unit: units[0], quantityInStock: 0, reorderLevel: 0, supplierId: suppliers[0]?.supplierId || "" });
    }
    setErrors({});
  }, [initialData, isOpen, suppliers]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Material name is required";
    if (form.quantityInStock < 0) next.quantityInStock = "Cannot be negative";
    if (form.reorderLevel < 0) next.reorderLevel = "Cannot be negative";
    if (!form.supplierId) next.supplierId = "Select a supplier";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const supplier = suppliers.find((s) => s.supplierId === form.supplierId);
    onSave({
      materialId: initialData?.materialId || generateId("RM"),
      ...form,
      supplierName: supplier?.name,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Raw Material" : "Add Raw Material"}
      subtitle={initialData ? `Editing ${initialData.materialId}` : "Track a new raw material in inventory"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Material Name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
          placeholder="e.g. Soy Wax Flakes"
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Unit"
            value={form.unit}
            onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))}
            options={units.map((u) => ({ value: u, label: u }))}
          />
          <Select
            label="Supplier"
            required
            value={form.supplierId}
            onChange={(e) => setForm((f) => ({ ...f, supplierId: e.target.value }))}
            options={suppliers.map((s) => ({ value: s.supplierId, label: s.name }))}
            error={errors.supplierId}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Quantity in Stock"
            type="number"
            required
            min={0}
            value={form.quantityInStock || ""}
            onChange={(e) => setForm((f) => ({ ...f, quantityInStock: parseFloat(e.target.value) || 0 }))}
            error={errors.quantityInStock}
          />
          <Input
            label="Reorder Level"
            type="number"
            required
            min={0}
            value={form.reorderLevel || ""}
            onChange={(e) => setForm((f) => ({ ...f, reorderLevel: parseFloat(e.target.value) || 0 }))}
            error={errors.reorderLevel}
            hint="Alert triggers below this"
          />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Material"}</Button>
        </div>
      </form>
    </Modal>
  );
}
