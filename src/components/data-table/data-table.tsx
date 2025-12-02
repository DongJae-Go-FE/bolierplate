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
  getPaginationRowModel,
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
  onPageChange?: () => void;
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
    getPaginationRowModel: getPaginationRowModel(),
    //manualPagination: true, 서버 사이드 페이지네이션
    onSortingChange: setSorting,
    onRowSelectionChange: onRowSelectionChange,
    state: {
      sorting,
      rowSelection,
    },
    initialState: {
      pagination: {
        pageSize: pageSize,
      },
    },
  });

  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = Math.ceil(totalCount / pageSize);

  //TODO. 추후 API 연동시  삭제
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

  return (
    <div className="flex w-full flex-col">
      <div className="relative h-[530px] w-full overflow-auto [&_>div]:h-full">
        <ContentRender
          isLoading={isLoading}
          isEmpty={data.length === 0 || !data}
        >
          <Table>
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
                <TableRow>
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
                onClick={() => table.setPageIndex(0)} //onPageChange
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()} //onPageChange
                disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {getPageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => table.setPageIndex(pageNum - 1)}
                  isActive={currentPage === pageNum}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()} //onPageChange
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationLast
                onClick={() => table.setPageIndex(totalPages - 1)} //onPageChange
                disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
