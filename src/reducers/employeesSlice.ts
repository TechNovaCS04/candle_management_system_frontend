import { createEntitySlice } from "../lib/createEntitySlice";
import { mockEmployees } from "../data/mockData";
import type { Employee } from "../types";

const slice = createEntitySlice<Employee>("employees", mockEmployees, "employeeId");

export const { addItem: addEmployee, updateItem: updateEmployee, removeItem: removeEmployee, setSearchTerm: setEmployeeSearch, setPage: setEmployeePage } = slice.actions;
export default slice.reducer;
