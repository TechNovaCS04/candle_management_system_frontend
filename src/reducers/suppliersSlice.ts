import { createEntitySlice } from "../lib/createEntitySlice";
import { mockSuppliers } from "../data/mockData";
import type { Supplier } from "../types";

const slice = createEntitySlice<Supplier>("suppliers", mockSuppliers, "supplierId");

export const { addItem: addSupplier, updateItem: updateSupplier, removeItem: removeSupplier, setSearchTerm: setSupplierSearch, setPage: setSupplierPage } = slice.actions;
export default slice.reducer;
