import { createEntitySlice } from "../lib/createEntitySlice";
import { mockRevenue } from "../data/mockData";
import type { Revenue } from "../types";

const slice = createEntitySlice<Revenue>("revenue", mockRevenue, "revenueId");

export const { addItem: addRevenue, updateItem: updateRevenue, removeItem: removeRevenue, setSearchTerm: setRevenueSearch, setPage: setRevenuePage } = slice.actions;
export default slice.reducer;
