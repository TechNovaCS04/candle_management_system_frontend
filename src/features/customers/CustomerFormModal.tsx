import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Customer } from "../../types";
import { generateId } from "../../lib/utils";

interface CustomerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (customer: Customer) => void;
  initialData?: Customer | null;
}

export default function CustomerFormModal({ isOpen, onClose, onSave, initialData }: CustomerFormModalProps) {
  const [form, setForm] = useState<Omit<Customer, "customerId">>({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { customerId, totalOrders, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({ name: "", phone: "", email: "", address: "" });
    }
    setErrors({});
  }, [initialData, isOpen]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
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
      customerId: initialData?.customerId || generateId("CUS"),
      totalOrders: initialData?.totalOrders || 0,
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Customer" : "Add New Customer"}
      subtitle={initialData ? `Editing ${initialData.customerId}` : "Add a new customer record"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
          placeholder="e.g. Dilani Perera"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            error={errors.phone}
            placeholder="077-1112233"
          />
          <Input
            label="Email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            error={errors.email}
            placeholder="customer@email.com"
          />
        </div>
        <Input
          label="Address"
          required
          value={form.address}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          error={errors.address}
          placeholder="e.g. 14 Lake Rd, Kandy"
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Customer"}</Button>
        </div>
      </form>
    </Modal>
  );
}
