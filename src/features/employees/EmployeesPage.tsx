import { useState, useCallback } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import PageHeader from "../../components/ui/PageHeader";
import { Card, Badge } from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Tabs from "../../components/ui/Tabs";
import DataTable, { type Column } from "../../components/ui/DataTable";
import ConfirmDialog from "../../components/ui/ConfirmDialog";
import EmployeeFormModal from "./EmployeeFormModal";
import AttendanceFormModal from "./AttendanceFormModal";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { addEmployee, updateEmployee, removeEmployee, setEmployeeSearch, setEmployeePage } from "../../reducers/employeesSlice";
import {
  addAttendance,
  updateAttendance,
  removeAttendance,
  setAttendanceSearch,
  setAttendancePage,
} from "../../reducers/attendanceSlice";
import type { Employee, Attendance, AttendanceStatus } from "../../types";
import { formatCurrency, formatDate, titleCase } from "../../lib/utils";
import { useEntityPage } from "../../lib/useEntityPage";

const attendanceTone: Record<AttendanceStatus, "neutral" | "success" | "warning" | "danger" | "info"> = {
  PRESENT: "success",
  ABSENT: "danger",
  LEAVE: "info",
  HALF_DAY: "warning",
};

export default function EmployeesPage() {
  const dispatch = useAppDispatch();
  const [activeTab, setActiveTab] = useState("employees");

  // Employees tab state
  const employeesState = useAppSelector((s) => s.employees);
  const [empModalOpen, setEmpModalOpen] = useState(false);
  const [empEditTarget, setEmpEditTarget] = useState<Employee | null>(null);
  const [empDeleteTarget, setEmpDeleteTarget] = useState<Employee | null>(null);
  const empSearchFields = useCallback((e: Employee) => [e.name, e.position, e.employeeId], []);
  const empPaged = useEntityPage(
    employeesState.items,
    employeesState.searchTerm,
    employeesState.page,
    employeesState.pageSize,
    empSearchFields
  );

  // Attendance tab state
  const attendanceState = useAppSelector((s) => s.attendance);
  const [attModalOpen, setAttModalOpen] = useState(false);
  const [attEditTarget, setAttEditTarget] = useState<Attendance | null>(null);
  const [attDeleteTarget, setAttDeleteTarget] = useState<Attendance | null>(null);
  const attSearchFields = useCallback((a: Attendance) => [a.employeeName || "", a.status, a.attendanceId], []);
  const attPaged = useEntityPage(
    attendanceState.items,
    attendanceState.searchTerm,
    attendanceState.page,
    attendanceState.pageSize,
    attSearchFields
  );

  const employeeColumns: Column<Employee>[] = [
    { header: "Employee ID", accessor: (e) => <span className="font-medium text-bronze-900">{e.employeeId}</span> },
    { header: "Name", accessor: (e) => <span className="font-medium text-bronze-900">{e.name}</span> },
    { header: "Position", accessor: (e) => <Badge tone="info">{titleCase(e.position)}</Badge> },
    { header: "Phone", accessor: (e) => e.phone, hideOnMobile: true },
    { header: "Salary", accessor: (e) => <span className="tabular">{formatCurrency(e.salary)}</span> },
  ];

  const attendanceColumns: Column<Attendance>[] = [
    { header: "Employee", accessor: (a) => <span className="font-medium text-bronze-900">{a.employeeName}</span> },
    { header: "Date", accessor: (a) => formatDate(a.date) },
    { header: "Status", accessor: (a) => <Badge tone={attendanceTone[a.status]}>{titleCase(a.status)}</Badge> },
  ];

  return (
    <div>
      <PageHeader
        title="Employees"
        subtitle="Manage staff records, job positions, and daily attendance."
        action={
          activeTab === "employees" ? (
            <Button icon={<Plus size={16} />} onClick={() => { setEmpEditTarget(null); setEmpModalOpen(true); }}>
              Add Employee
            </Button>
          ) : (
            <Button icon={<Plus size={16} />} onClick={() => { setAttEditTarget(null); setAttModalOpen(true); }}>
              Mark Attendance
            </Button>
          )
        }
      />

      <Tabs
        tabs={[
          { id: "employees", label: "Employees" },
          { id: "attendance", label: "Attendance" },
        ]}
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <Card className="p-5">
        {activeTab === "employees" ? (
          <DataTable
            columns={employeeColumns}
            data={empPaged.paginated}
            rowKey={(e) => e.employeeId}
            searchTerm={employeesState.searchTerm}
            onSearchChange={(v) => dispatch(setEmployeeSearch(v))}
            searchPlaceholder="Search employees..."
            page={employeesState.page}
            pageSize={employeesState.pageSize}
            totalItems={empPaged.totalItems}
            onPageChange={(p) => dispatch(setEmployeePage(p))}
            emptyMessage="No employees found."
            actions={(e) => (
              <>
                <button
                  onClick={() => { setEmpEditTarget(e); setEmpModalOpen(true); }}
                  className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                  aria-label={`Edit ${e.name}`}
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setEmpDeleteTarget(e)}
                  className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                  aria-label={`Delete ${e.name}`}
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          />
        ) : (
          <DataTable
            columns={attendanceColumns}
            data={attPaged.paginated}
            rowKey={(a) => a.attendanceId}
            searchTerm={attendanceState.searchTerm}
            onSearchChange={(v) => dispatch(setAttendanceSearch(v))}
            searchPlaceholder="Search attendance records..."
            page={attendanceState.page}
            pageSize={attendanceState.pageSize}
            totalItems={attPaged.totalItems}
            onPageChange={(p) => dispatch(setAttendancePage(p))}
            emptyMessage="No attendance records found."
            actions={(a) => (
              <>
                <button
                  onClick={() => { setAttEditTarget(a); setAttModalOpen(true); }}
                  className="p-1.5 text-bronze-500 hover:bg-wax-100 rounded-lg transition-colors"
                  aria-label="Edit attendance"
                >
                  <Pencil size={15} />
                </button>
                <button
                  onClick={() => setAttDeleteTarget(a)}
                  className="p-1.5 text-ember-500 hover:bg-ember-100 rounded-lg transition-colors"
                  aria-label="Delete attendance"
                >
                  <Trash2 size={15} />
                </button>
              </>
            )}
          />
        )}
      </Card>

      <EmployeeFormModal
        isOpen={empModalOpen}
        onClose={() => setEmpModalOpen(false)}
        onSave={(emp) => {
          if (empEditTarget) dispatch(updateEmployee(emp));
          else dispatch(addEmployee(emp));
          setEmpEditTarget(null);
        }}
        initialData={empEditTarget}
      />
      <ConfirmDialog
        isOpen={!!empDeleteTarget}
        onClose={() => setEmpDeleteTarget(null)}
        onConfirm={() => empDeleteTarget && dispatch(removeEmployee(empDeleteTarget.employeeId))}
        title="Delete Employee"
        message={`Are you sure you want to delete "${empDeleteTarget?.name}"? This action cannot be undone.`}
      />

      <AttendanceFormModal
        isOpen={attModalOpen}
        onClose={() => setAttModalOpen(false)}
        onSave={(att) => {
          if (attEditTarget) dispatch(updateAttendance(att));
          else dispatch(addAttendance(att));
          setAttEditTarget(null);
        }}
        initialData={attEditTarget}
      />
      <ConfirmDialog
        isOpen={!!attDeleteTarget}
        onClose={() => setAttDeleteTarget(null)}
        onConfirm={() => attDeleteTarget && dispatch(removeAttendance(attDeleteTarget.attendanceId))}
        title="Delete Attendance Record"
        message="Are you sure you want to delete this attendance record? This action cannot be undone."
      />
    </div>
  );
}
