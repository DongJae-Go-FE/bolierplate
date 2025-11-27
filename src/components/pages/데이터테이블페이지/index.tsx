"use client";

import DataTable from "@/components/data-table/data-table";

import Columns from "./columns";

import data from "./data.json";

export default function TablePage() {
  return (
    <>
      <div className="mb-4 h-10 w-full bg-gray-200"></div>
      <DataTable
        caption="테이터 테이블 예제 테이블"
        columns={Columns}
        data={data}
        isSticky
      />
    </>
  );
}
