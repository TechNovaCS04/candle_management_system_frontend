import { useState, useEffect, type FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Select, Input } from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import type { Attendance, AttendanceStatus } from "../../types";
import { generateId } from "../../lib/utils";
import { useAppSelector } from "../../app/hooks";

const statuses: AttendanceStatus[] = ["PRESENT", "ABSENT", "LEAVE", "HALF_DAY"];

interface AttendanceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (attendance: Attendance) => void;
  initialData?: Attendance | null;
}

export default function AttendanceFormModal({ isOpen, onClose, onSave, initialData }: AttendanceFormModalProps) {
  const employees = useAppSelector((s) => s.employees.items);
  const [form, setForm] = useState({
    employeeId: employees[0]?.employeeId || "",
    date: new Date().toISOString().slice(0, 10),
    status: "PRESENT" as AttendanceStatus,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setForm({ employeeId: initialData.employeeId, date: initialData.date, status: initialData.status });
    } else {
      setForm({ employeeId: employees[0]?.employeeId || "", date: new Date().toISOString().slice(0, 10), status: "PRESENT" });
    }
    setErrors({});
  }, [initialData, isOpen, employees]);

  function validate() {
    const next: Record<string, string> = {};
    if (!form.employeeId) next.employeeId = "Select an employee";
    if (!form.date) next.date = "Date is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const employee = employees.find((e) => e.employeeId === form.employeeId);
    onSave({
      attendanceId: initialData?.attendanceId || generateId("ATT"),
      ...form,
      employeeName: employee?.name,
    });
    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? "Edit Attendance" : "Mark Attendance"}
      subtitle={initialData ? `Editing ${initialData.attendanceId}` : "Record daily attendance"}
      size="sm"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
        <Select
          label="Employee"
          required
          value={form.employeeId}
          onChange={(e) => setForm((f) => ({ ...f, employeeId: e.target.value }))}
          options={employees.map((e) => ({ value: e.employeeId, label: e.name }))}
          error={errors.employeeId}
        />
        <Input
          label="Date"
          type="date"
          required
          value={form.date}
          onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
          error={errors.date}
        />
        <Select
          label="Status"
          value={form.status}
          onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as AttendanceStatus }))}
          options={statuses.map((s) => ({ value: s, label: s.replace("_", " ") }))}
        />

        <div className="flex justify-end gap-2 mt-2">
          <Button type="button" variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{initialData ? "Save Changes" : "Mark Attendance"}</Button>
        </div>
      </form>
    </Modal>
  );
}
