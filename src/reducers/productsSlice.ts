import { createEntitySlice } from "../lib/createEntitySlice";
import { mockProducts } from "../data/mockData";
import type { Product } from "../types";

const slice = createEntitySlice<Product>("products", mockProducts, "productId");

export const { addItem: addProduct, updateItem: updateProduct, removeItem: removeProduct, setSearchTerm: setProductSearch, setPage: setProductPage } = slice.actions;
export default slice.reducer;
