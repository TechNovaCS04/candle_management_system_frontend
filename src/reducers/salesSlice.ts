import { createEntitySlice } from "../lib/createEntitySlice";
import { mockSales } from "../data/mockData";
import type { Sale } from "../types";

const slice = createEntitySlice<Sale>("sales", mockSales, "saleId");

export const { addItem: addSale, updateItem: updateSale, removeItem: removeSale, setSearchTerm: setSaleSearch, setPage: setSalePage } = slice.actions;
export default slice.reducer;
