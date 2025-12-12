"use client";

//import Link from "next/link";

import { useState } from "react";

import {
  getCoreRowModel,
  useReactTable,
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  RowSelectionState,
  OnChangeFn,
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

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationLast,
  PaginationNext,
  PaginationPrevious,
  PaginationStart,
} from "@hdc-ui/components/ui/pagination";

import { ContentRender } from "../ui/common-layout";

import { cn } from "@hdc-ui/utils";

type DataTableProps<T> = {
  data?: T[];
  columns: ColumnDef<T>[];
  caption: string;
  isSticky?: boolean;
  pageSize?: number;
  totalCount: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  isLoading?: boolean;
};

export default function DataTable<T>({
  data = [],
  columns,
  caption,
  isSticky,
  totalCount,
  pageSize = 10,
  currentPage = 1,
  onPageChange,
  isLoading = false,
  rowSelection,
  onRowSelectionChange,
}: DataTableProps<T>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  // eslint-disable-next-line
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(totalCount / pageSize),
    onSortingChange: setSorting,
    onRowSelectionChange: onRowSelectionChange,
    state: {
      sorting,
      rowSelection,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: pageSize,
      },
    },
  });

  const totalPages = Math.ceil(totalCount / pageSize);

  const getPageNumbers = () => {
    const pages: number[] = [];
    const maxVisible = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-[530px] w-full overflow-auto [&_>div]:h-full">
        <ContentRender
          isLoading={isLoading}
          isEmpty={data.length === 0 || !data}
        >
          <Table
            className={cn(table.getRowModel().rows.length === 0 && "h-full")}
          >
            <TableCaption>{caption}</TableCaption>
            <TableHeader className={cn(isSticky && "sticky -top-[px] z-10")}>
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
              {table.getRowModel().rows.length > 0 ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="hover:[&_>td]:bg-gray-100 has-[button[data-state=checked]]:[&_>td]:bg-gray-100"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="border-r-0">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow className="h-full">
                  <TableCell colSpan={columns.length} className="text-center">
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </ContentRender>
      </div>

      {totalPages > 1 && !isLoading && data.length !== 0 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationStart
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => handlePageChange(pageNum)}
                  isActive={currentPage === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
