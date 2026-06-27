import { createEntitySlice } from "../lib/createEntitySlice";
import { mockExpenses } from "../data/mockData";
import type { Expense } from "../types";

const slice = createEntitySlice<Expense>("expenses", mockExpenses, "expenseId");

export const { addItem: addExpense, updateItem: updateExpense, removeItem: removeExpense, setSearchTerm: setExpenseSearch, setPage: setExpensePage } = slice.actions;
export default slice.reducer;
