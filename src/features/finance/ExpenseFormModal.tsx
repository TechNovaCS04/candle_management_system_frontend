import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Expense } from "../../types";
import { generateId } from "../../lib/utils";

const categories = ["Raw Materials", "Utilities", "Payroll", "Packaging", "Logistics", "Marketing", "Other"];

interface ExpenseFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
  initialData?: Expense | null;
}

export default function ExpenseFormModal({ isOpen, onClose, onSave, initialData }: ExpenseFormModalProps) {
  const [form, setForm] = useState<Omit<Expense, "expenseId">>({
    description: "",
    amount: 0,
    expenseDate: new Date().toISOString().slice(0, 10),
    category: categories[0],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { expenseId, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({ description: "", amount: 0, expenseDate: new Date().toISOString().slice(0, 10), category: categories[0] });
    }
    setErrors({});
  }, [initialData, isOpen]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.description.trim()) next.description = "Description is required";
    if (form.amount <= 0) next.amount = "Amount must be greater than 0";
    if (!form.expenseDate) next.expenseDate = "Date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      expenseId: initialData?.expenseId || generateId("EXP"),
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Expense" : "Record New Expense"}
      subtitle={initialData ? `Editing ${initialData.expenseId}` : "Log a business expense"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Description"
          required
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          error={errors.description}
          placeholder="e.g. Raw material purchase – Soy wax"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Amount (Rs.)"
            type="number"
            required
            min={0}
            step="0.01"
            value={form.amount || ""}
            onChange={(e) => setForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
            error={errors.amount}
          />
          <Input
            label="Date"
            type="date"
            required
            value={form.expenseDate}
            onChange={(e) => setForm((f) => ({ ...f, expenseDate: e.target.value }))}
            error={errors.expenseDate}
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
          <Button type="submit">{initialData ? "Save Changes" : "Record Expense"}</Button>
        </div>
      </form>
    </Modal>
  );
}
