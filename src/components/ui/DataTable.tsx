import type { ReactNode } from "react";
import { Search, Inbox } from "lucide-react";
import Pagination from "./Pagination";

export interface Column<T> {
  header: string;
  accessor: (row: T) => ReactNode;
  className?: string;
  hideOnMobile?: boolean;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  rowKey: (row: T) => string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  actions?: (row: T) => ReactNode;
  emptyMessage?: string;
  toolbar?: ReactNode;
}

export default function DataTable<T>({
  columns,
  data,
  rowKey,
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Search...",
  page,
  pageSize,
  totalItems,
  onPageChange,
  actions,
  emptyMessage = "No records found.",
  toolbar,
}: DataTableProps<T>) {
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-bronze-300" />
          <input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-wax-200 bg-cream-50 pl-9 pr-3 py-2.5 text-sm text-bronze-900 placeholder:text-bronze-300 focus:outline-none focus:ring-2 focus:ring-bronze-300 focus:border-bronze-400 transition-colors"
          />
        </div>
        {toolbar && <div className="flex items-center gap-2">{toolbar}</div>}
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-12 h-12 rounded-full bg-wax-100 flex items-center justify-center mb-3">
            <Inbox size={20} className="text-bronze-400" />
          </div>
          <p className="text-bronze-500 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <>
          {/* Desktop / tablet table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-wax-200">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-wax-100/60 border-b border-wax-200">
                  {columns.map((col, i) => (
                    <th
                      key={i}
                      className={`text-left font-semibold text-bronze-700 px-4 py-3 whitespace-nowrap ${col.className || ""}`}
                    >
                      {col.header}
                    </th>
                  ))}
                  {actions && <th className="px-4 py-3 text-right text-bronze-700 font-semibold">Actions</th>}
                </tr>
              </thead>
              <tbody>
                {data.map((row) => (
                  <tr
                    key={rowKey(row)}
                    className="border-b border-wax-100 last:border-0 hover:bg-cream-200/60 transition-colors"
                  >
                    {columns.map((col, i) => (
                      <td key={i} className={`px-4 py-3 text-bronze-800 ${col.className || ""}`}>
                        {col.accessor(row)}
                      </td>
                    ))}
                    {actions && (
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">{actions(row)}</div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile card list */}
          <div className="md:hidden flex flex-col gap-3">
            {data.map((row) => (
              <div
                key={rowKey(row)}
                className="bg-cream-50 border border-wax-200 rounded-xl p-4"
              >
                <div className="flex flex-col gap-2">
                  {columns
                    .filter((c) => !c.hideOnMobile)
                    .map((col, i) => (
                      <div key={i} className="flex items-baseline justify-between gap-3">
                        <span className="text-xs font-medium text-bronze-400 uppercase tracking-wide flex-shrink-0">
                          {col.header}
                        </span>
                        <span className="text-bronze-800 text-right">{col.accessor(row)}</span>
                      </div>
                    ))}
                </div>
                {actions && (
                  <div className="flex justify-end gap-1 mt-3 pt-3 border-t border-wax-100">
                    {actions(row)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {totalItems > 0 && (
        <Pagination page={page} pageSize={pageSize} totalItems={totalItems} onPageChange={onPageChange} />
      )}
    </div>
  );
}
