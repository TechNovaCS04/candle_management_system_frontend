import { createEntitySlice } from "../lib/createEntitySlice";
import { mockProductionBatches } from "../data/mockData";
import type { ProductionBatch } from "../types";

const slice = createEntitySlice<ProductionBatch>("production", mockProductionBatches, "batchId");

export const { addItem: addBatch, updateItem: updateBatch, removeItem: removeBatch, setSearchTerm: setBatchSearch, setPage: setBatchPage } = slice.actions;
export default slice.reducer;
