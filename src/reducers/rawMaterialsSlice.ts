import { createEntitySlice } from "../lib/createEntitySlice";
import { mockRawMaterials } from "../data/mockData";
import type { RawMaterial } from "../types";

const slice = createEntitySlice<RawMaterial>("rawMaterials", mockRawMaterials, "materialId");

export const { addItem: addRawMaterial, updateItem: updateRawMaterial, removeItem: removeRawMaterial, setSearchTerm: setRawMaterialSearch, setPage: setRawMaterialPage } = slice.actions;
export default slice.reducer;
