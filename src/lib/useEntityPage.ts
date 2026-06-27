import { useMemo } from "react";
import { filterBySearch, paginate } from "./utils";

export function useEntityPage<T>(
  items: T[],
  searchTerm: string,
  page: number,
  pageSize: number,
  searchFields: (item: T) => string[]
) {
  const filtered = useMemo(
    () => filterBySearch(items, searchTerm, searchFields),
    [items, searchTerm, searchFields]
  );
  const paginated = useMemo(() => paginate(filtered, page, pageSize), [filtered, page, pageSize]);

  return { filtered, paginated, totalItems: filtered.length };
}
