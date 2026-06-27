import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input, Textarea, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Product } from "../../types";
import { generateId } from "../../lib/utils";

const categories = ["Jar Candles", "Pillar Candles", "Votives", "Travel Tins", "Gift Sets"];

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  initialData?: Product | null;
}

export default function ProductFormModal({ isOpen, onClose, onSave, initialData }: ProductFormModalProps) {
  const [form, setForm] = useState<Omit<Product, "productId">>({
    name: "",
    description: "",
    price: 0,
    stockQuantity: 0,
    category: categories[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { productId, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({ name: "", description: "", price: 0, stockQuantity: 0, category: categories[0] });
    }
    setErrors({});
  }, [initialData, isOpen]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Product name is required";
    if (!form.description.trim()) next.description = "Description is required";
    if (form.price <= 0) next.price = "Price must be greater than 0";
    if (form.stockQuantity < 0) next.stockQuantity = "Stock cannot be negative";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      productId: initialData?.productId || generateId("PRD"),
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Product" : "Add New Product"}
      subtitle={initialData ? `Editing ${initialData.productId}` : "Add a finished candle product to inventory"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Product Name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
          placeholder="e.g. Lavender Bliss Jar Candle"
        />
        <Textarea
          label="Description"
          required
          rows={3}
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          error={errors.description}
          placeholder="Brief description of the product"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Price (Rs.)"
            type="number"
            required
            min={0}
            step="0.01"
            value={form.price || ""}
            onChange={(e) => setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))}
            error={errors.price}
          />
          <Input
            label="Stock Quantity"
            type="number"
            required
            min={0}
            value={form.stockQuantity || ""}
            onChange={(e) => setForm((f) => ({ ...f, stockQuantity: parseInt(e.target.value) || 0 }))}
            error={errors.stockQuantity}
          />
        </div>
        <Select
          label="Category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          options={categories.map((c) => ({ value: c, label: c }))}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Product"}</Button>
        </div>
      </form>
    </Modal>
  );
}
