import { createEntitySlice } from "../lib/createEntitySlice";
import { mockCustomers } from "../data/mockData";
import type { Customer } from "../types";

const slice = createEntitySlice<Customer>("customers", mockCustomers, "customerId");

export const { addItem: addCustomer, updateItem: updateCustomer, removeItem: removeCustomer, setSearchTerm: setCustomerSearch, setPage: setCustomerPage } = slice.actions;
export default slice.reducer;
