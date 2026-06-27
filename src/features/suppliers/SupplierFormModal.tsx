import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Supplier } from "../../types";
import { generateId } from "../../lib/utils";

interface SupplierFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (supplier: Supplier) => void;
  initialData?: Supplier | null;
}

export default function SupplierFormModal({ isOpen, onClose, onSave, initialData }: SupplierFormModalProps) {
  const [form, setForm] = useState<Omit<Supplier, "supplierId">>({
    name: "",
    contactNo: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { supplierId, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({ name: "", contactNo: "", email: "", address: "" });
    }
    setErrors({});
  }, [initialData, isOpen]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Supplier name is required";
    if (!form.contactNo.trim()) next.contactNo = "Contact number is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";
    if (!form.address.trim()) next.address = "Address is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      supplierId: initialData?.supplierId || generateId("SUP"),
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Supplier" : "Add New Supplier"}
      subtitle={initialData ? `Editing ${initialData.supplierId}` : "Add a new raw material supplier"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Supplier Name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
          placeholder="e.g. Kandy Wax Traders"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Contact Number"
            required
            value={form.contactNo}
            onChange={(e) => setForm((f) => ({ ...f, contactNo: e.target.value }))}
            error={errors.contactNo}
            placeholder="081-2234567"
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            error={errors.email}
            placeholder="supplier@email.com"
          />
        </div>
        <Input
          label="Address"
          required
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          error={errors.address}
          placeholder="e.g. 45 Peradeniya Rd, Kandy"
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Supplier"}</Button>
        </div>
      </form>
    </Modal>
  );
}
