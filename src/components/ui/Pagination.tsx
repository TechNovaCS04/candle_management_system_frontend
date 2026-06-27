import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ page, pageSize, totalItems, onPageChange }: PaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startItem = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const endItem = Math.min(page * pageSize, totalItems);

  const pageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages = new Set<number>([1, 2, totalPages - 1, totalPages, page - 1, page, page + 1]);
    const sorted = Array.from(pages).filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
    const result: (number | "ellipsis")[] = [];
    let prev = 0;
    for (const p of sorted) {
      if (prev && p - prev > 1) result.push("ellipsis");
      result.push(p);
      prev = p;
    }
    return result;
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-1 py-3">
      <p className="text-sm text-bronze-500 order-2 sm:order-1">
        Showing <span className="font-medium text-bronze-700">{startItem}</span>–
        <span className="font-medium text-bronze-700">{endItem}</span> of{" "}
        <span className="font-medium text-bronze-700">{totalItems}</span>
      </p>
      <div className="flex items-center gap-1 order-1 sm:order-2 self-end sm:self-auto">
        <button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          aria-label="Previous page"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-bronze-600 hover:bg-wax-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        {pageNumbers().map((p, idx) =>
          p === "ellipsis" ? (
            <span key={`e-${idx}`} className="w-8 h-8 flex items-center justify-center text-bronze-300 text-sm">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              aria-current={p === page ? "page" : undefined}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? "bg-bronze-500 text-cream-50"
                  : "text-bronze-600 hover:bg-wax-100"
              }`}
            >
              {p}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          aria-label="Next page"
          className="w-8 h-8 flex items-center justify-center rounded-lg text-bronze-600 hover:bg-wax-100 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
