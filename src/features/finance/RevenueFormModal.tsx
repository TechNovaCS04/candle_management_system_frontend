import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Revenue } from "../../types";
import { generateId } from "../../lib/utils";
import { useAppSelector } from "../../app/hooks";

interface RevenueFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (revenue: Revenue) => void;
  initialData?: Revenue | null;
}

export default function RevenueFormModal({ isOpen, onClose, onSave, initialData }: RevenueFormModalProps) {
  const sales = useAppSelector((s) => s.sales.items);
  const [form, setForm] = useState({
    saleId: sales[0]?.saleId || "",
    amount: 0,
    receivedDate: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm({ saleId: initialData.saleId, amount: initialData.amount, receivedDate: initialData.receivedDate });
    } else {
      setForm({ saleId: sales[0]?.saleId || "", amount: 0, receivedDate: new Date().toISOString().slice(0, 10) });
    }
    setErrors({});
  }, [initialData, isOpen, sales]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.saleId) next.saleId = "Select a sale";
    if (form.amount <= 0) next.amount = "Amount must be greater than 0";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      revenueId: initialData?.revenueId || generateId("REV"),
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Revenue Record" : "Record Revenue"}
      subtitle={initialData ? `Editing ${initialData.revenueId}` : "Log revenue received from a sale"}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Select
          label="Related Sale"
          required
          value={form.saleId}
          onChange={(e) => setForm((f) => ({ ...f, saleId: e.target.value }))}
          options={sales.map((s) => ({ value: s.saleId, label: `${s.saleId} – ${s.customerName}` }))}
          error={errors.saleId}
        />
        <Input
          label="Amount Received (Rs.)"
          type="number"
          required
          min={0}
          step="0.01"
          value={form.amount || ""}
          onChange={(e) => setForm((f) => ({ ...f, amount: parseFloat(e.target.value) || 0 }))}
          error={errors.amount}
        />
        <Input
          label="Date Received"
          type="date"
          required
          value={form.receivedDate}
          onChange={(e) => setForm((f) => ({ ...f, receivedDate: e.target.value }))}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Record Revenue"}</Button>
        </div>
      </form>
    </Modal>
  );
}
