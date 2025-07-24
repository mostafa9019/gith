// File: components/data-table/data-table-content.tsx
import { Table, flexRender, ColumnDef } from "@tanstack/react-table";
import {
  Table as UITable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableContentProps<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData>[];
  isLoading: boolean;
}

export function DataTableContent<TData>({
  table,
  columns,
  isLoading,
}: DataTableContentProps<TData>) {
  return (
    <>
      <UITable className="border border-gray-200 w-full hidden md:table">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-primary"
              >
                Chargement...
              </TableCell>
            </TableRow>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-primary">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center text-primary"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </UITable>
      <div className="space-y-4 w-full md:hidden">
        {isLoading ? (
          <div className="p-4 text-center border rounded-lg shadow-sm text-primary">
            Chargement...
          </div>
        ) : table.getRowModel().rows?.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg shadow-sm overflow-hidden bg-white"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => {
                // Get the header for this cell to use as a label
                const header = table
                  .getHeaderGroups()
                  .flatMap((headerGroup) => headerGroup.headers)
                  .find((h) => h.id === cell.column.id);

                const headerContent = header
                  ? flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )
                  : cell.column.id;

                return (
                  <div
                    key={cell.id}
                    className="p-3 border-b last:border-b-0 flex justify-between items-center"
                  >
                    <div className="font-medium text-sm text-gray-500">
                      {headerContent}
                    </div>
                    <div className="text-primary">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          <div className="p-4 text-center border rounded-lg shadow-sm text-primary">
            No results.
          </div>
        )}
      </div>
    </>
  );
}
