"use client";

import { useState } from "react";

import DataTable from "@/components/data-table/data-table";

import Columns from "./columns";

import {
  Filter,
  FilterContainer,
  CommonFilter,
  SampleFirstFilter,
  FilterReset,
} from "@/components/ui/filter";
import { Input } from "@hdc-ui/components/ui/input";

import { Button } from "@hdc-ui/components/ui/button";

import data from "./data.json";

export default function TablePage() {
  const [value, setValue] = useState("전체");
  const [valueTwo, setTwoValue] = useState("샘플1");

  return (
    <>
      <Filter>
        <FilterContainer>
          <CommonFilter value={value} onChange={setValue} />
          <Input className="w-80" placeholder="검색어를 입력해주세요." />
          <SampleFirstFilter value={valueTwo} onChange={setTwoValue} />
          <FilterReset />
        </FilterContainer>

        <FilterContainer>
          <Button type="button" color="outlined">
            삭제
          </Button>
          <Button type="button" color="gray">
            등록
          </Button>
        </FilterContainer>
      </Filter>
      <DataTable
        caption="테이터 테이블 예제 테이블"
        columns={Columns}
        data={data}
        totalCount={data.length}
      />
    </>
  );
}
