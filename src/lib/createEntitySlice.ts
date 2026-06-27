import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface EntityState<T> {
  items: T[];
  searchTerm: string;
  page: number;
  pageSize: number;
}

/**
 * Creates a standard CRUD slice (add / update / remove / setSearchTerm / setPage)
 * for a given entity. All modules share this shape so the service layer can be
 * swapped for real API calls later without touching component code.
 */
export function createEntitySlice<T extends Record<string, any>>(
  name: string,
  initialItems: T[],
  idKey: keyof T,
  defaultPageSize = 8
) {
  const initialState: EntityState<T> = {
    items: initialItems,
    searchTerm: "",
    page: 1,
    pageSize: defaultPageSize,
  };

  const slice = createSlice({
    name,
    initialState,
    reducers: {
      addItem: (state, action: PayloadAction<T>) => {
        state.items.unshift(action.payload as any);
        state.page = 1;
      },
      updateItem: (state, action: PayloadAction<T>) => {
        const idx = state.items.findIndex(
          (i: any) => i[idKey] === (action.payload as any)[idKey]
        );
        if (idx !== -1) state.items[idx] = action.payload as any;
      },
      removeItem: (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(
          (i: any) => String(i[idKey]) !== action.payload
        ) as any;
      },
      setSearchTerm: (state, action: PayloadAction<string>) => {
        state.searchTerm = action.payload;
        state.page = 1;
      },
      setPage: (state, action: PayloadAction<number>) => {
        state.page = action.payload;
      },
    },
  });

  return slice;
}
