// File: components/data-table/data-table.tsx
import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type SortingState,
  type ColumnFiltersState,
  type ColumnDef,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { DataTableToolbar } from "./data-table-toolbar";
import { DataTableContent } from "./data-table-content";
import { DataTablePagination } from "./data-table-pagination";
import SellerStatusFilter from "../SellerStatusFilter";
import { useRefreshStore } from "@/stores/useRefreshStore";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  fetchDataFn: (params: {
    page_number: number;
    page_size: number;
    statusId: number;
  }) => Promise<any>;
  queryKey: string;
  defaultStatusId?: number;
}

export function DataTable<TData>({
  columns,
  fetchDataFn,
  queryKey,
  defaultStatusId = 0,
}: DataTableProps<TData>) {
  const { isRefreshing } = useRefreshStore();
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [statusId, setStatusId] = useState(defaultStatusId);

  const handleStatusChange = (newStatus: number) => {
    setStatusId(newStatus);
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  };

  const { data: queryResult, isLoading } = useQuery({
    queryKey: [
      queryKey,
      pagination.pageIndex,
      pagination.pageSize,
      statusId,
      isRefreshing,
    ],
    queryFn: () =>
      fetchDataFn({
        page_number: pagination.pageIndex + 1,
        page_size: pagination.pageSize,
        statusId: statusId,
      }),
    retry: false,
  });

  const data = useMemo(() => queryResult || [], [queryResult]);
  const pageCount = useMemo(() => queryResult?.totalPages || 0, [queryResult]);
  const rowCount = useMemo(() => queryResult?.totalItems || 0, [queryResult]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
    manualSorting: false,
    manualFiltering: false,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <SellerStatusFilter onStatusChange={handleStatusChange} />
      <DataTableToolbar
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <DataTableContent table={table} columns={columns} isLoading={isLoading} />
      <DataTablePagination
        table={table}
        pageCount={pageCount}
        rowCount={rowCount}
        pagination={pagination}
      />
    </div>
  );
}
