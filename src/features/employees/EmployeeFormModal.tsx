import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Input, Select } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Employee, EmployeeDesignation } from "../../types";
import { generateId } from "../../lib/utils";

const positions: EmployeeDesignation[] = ["MANAGER", "PRODUCTION_STAFF", "SALES_STAFF", "ACCOUNTANT", "OTHER"];

interface EmployeeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (employee: Employee) => void;
  initialData?: Employee | null;
}

export default function EmployeeFormModal({ isOpen, onClose, onSave, initialData }: EmployeeFormModalProps) {
  const [form, setForm] = useState<Omit<Employee, "employeeId">>({
    name: "",
    position: "PRODUCTION_STAFF",
    phone: "",
    salary: 0,
    joinedDate: new Date().toISOString().slice(0, 10),
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      const { employeeId, ...rest } = initialData;
      setForm(rest);
    } else {
      setForm({
        name: "",
        position: "PRODUCTION_STAFF",
        phone: "",
        salary: 0,
        joinedDate: new Date().toISOString().slice(0, 10),
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.phone.trim()) next.phone = "Phone number is required";
    if (form.salary <= 0) next.salary = "Salary must be greater than 0";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    onSave({
      employeeId: initialData?.employeeId || generateId("EMP"),
      ...form,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Employee" : "Add New Employee"}
      subtitle={initialData ? `Editing ${initialData.employeeId}` : "Add a new staff member"}
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Input
          label="Full Name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          error={errors.name}
          placeholder="e.g. Ruwan Jayasuriya"
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Position"
            value={form.position}
            onChange={(e) => setForm((f) => ({ ...f, position: e.target.value as EmployeeDesignation }))}
            options={positions.map((p) => ({ value: p, label: p.replace("_", " ") }))}
          />
          <Input
            label="Phone Number"
            required
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            error={errors.phone}
            placeholder="077-1010101"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Monthly Salary (Rs.)"
            type="number"
            required
            min={0}
            value={form.salary || ""}
            onChange={(e) => setForm((f) => ({ ...f, salary: parseFloat(e.target.value) || 0 }))}
            error={errors.salary}
          />
          <Input
            label="Joined Date"
            type="date"
            value={form.joinedDate}
            onChange={(e) => setForm((f) => ({ ...f, joinedDate: e.target.value }))}
          />
        </div>

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Add Employee"}</Button>
        </div>
      </form>
    </Modal>
  );
}
