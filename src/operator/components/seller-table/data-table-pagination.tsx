// File: components/data-table/data-table-pagination.tsx
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  pageCount: number;
  rowCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
}

export function DataTablePagination<TData>({
  table,
  pageCount,
  rowCount,
  pagination,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const from = pagination.pageIndex * pagination.pageSize + 1;
  const to = Math.min(
    (pagination.pageIndex + 1) * pagination.pageSize,
    rowCount
  );

  return (
    <div className="flex flex-col xs:flex-row items-center justify-between gap-4 py-2 sm:py-4">
      <div className="text-xs sm:text-sm text-muted-foreground text-center xs:text-left">
        {rowCount > 0 && `Showing ${from} to ${to} of ${rowCount} entries`}
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          className="text-primary rounded-full h-8 px-2 sm:px-3"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline ml-1">Previous</span>
        </Button>

        <div className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">
          Page {currentPage} of {pageCount || 1}
        </div>

        <Button
          variant="outline"
          size="sm"
          className="text-primary rounded-full h-8 px-2 sm:px-3"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
