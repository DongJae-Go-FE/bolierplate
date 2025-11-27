"use client";

import { useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@hdc-ui/components/ui/table";

import { cn } from "@hdc-ui/utils";

type DataTableProps<T> = {
  data?: T[];
  columns: ColumnDef<T>[];
  caption: string;
  isSticky?: boolean;
};

export default function DataTable<T>({
  data = [],
  columns,
  caption,
  isSticky,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div className="flex w-full flex-col">
      <div className="relative max-h-150 w-full overflow-auto [&_>div]:h-full">
        <Table>
          <TableCaption>{caption}</TableCaption>
          <TableHeader className={cn(isSticky && "sticky -top-[1px] z-10")}>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="border-r-0">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:[&_>td]:bg-gray-100 has-[button[data-state=checked]]:[&_>td]:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="border-r-0">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
