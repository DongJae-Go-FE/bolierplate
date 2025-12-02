"use client";

import { useState } from "react";

import { useQuery, useMutation } from "@tanstack/react-query";

import DataTable from "@/components/data-table/data-table";

import {
  Filter,
  FilterContainer,
  CommonFilter,
  SampleFirstFilter,
  FilterSearch,
  FilterReset,
} from "@/components/ui/filter";

import Alert from "@/components/ui/alert";
import Modal from "@/components/ui/modal";

import { Input } from "@hdc-ui/components/ui/input";

import { Button } from "@hdc-ui/components/ui/button";

import { GET_EXAMPLE_REQUEST, QueryKey } from "@/lib/network/api";

import { RowSelectionState } from "@tanstack/react-table";

import Columns from "./columns";

import HttpRequest from "@/lib/network/http-request";
import useFilter from "@/hooks/use-filter";

import { REQ_EXAMPLE_TYPE } from "@/lib/network/types";
import { CONST_SOLUTION_NAME, CONST_SEARCH_PLACEHOLDER } from "@/lib/const";

import sampleData from "./data.json";

export default function TablePage() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const { filter, setFilter, handleFilterSubmit, handleFilterReset, query } =
    useFilter<REQ_EXAMPLE_TYPE>({
      initialState: {
        search: "",
        value: "전체",
        valueTwo: "샘플1",
      },
    });

  //data, isLoading 추가
  const { refetch } = useQuery({
    queryKey: [QueryKey.EXAMPLE, query],
    queryFn: () => GET_EXAMPLE_REQUEST({ ...filter }),
  });

  const deleteMutation = useMutation({
    mutationKey: ["deleteExample"],
    mutationFn: async (payload: RowSelectionState) => {
      const res = await HttpRequest.set<
        { message: "응답 성공" },
        RowSelectionState
      >("DELETE", `/api/example`, payload);

      if (!res.success) {
        throw new Error(res.msg);
      }

      return res;
    },

    onSuccess: () => {
      setIsSuccess(true);
      refetch();
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(rowSelection);
  };

  return (
    <>
      <Filter>
        <FilterContainer>
          <CommonFilter
            value={filter.value}
            onChange={(value) => {
              setFilter((prev) => {
                prev.value = value;
                return { ...prev };
              });
            }}
          />
          <Input
            value={filter.search}
            onChange={(value) => {
              setFilter((prev) => {
                prev.search = value.target.value;
                return { ...prev };
              });
            }}
            className="w-80"
            placeholder={CONST_SEARCH_PLACEHOLDER}
          />
          <SampleFirstFilter
            value={filter.valueTwo}
            onChange={(value) => {
              setFilter((prev) => {
                prev.valueTwo = value;
                return { ...prev };
              });
            }}
          />
          <FilterSearch type="button" onClick={handleFilterSubmit} />
          <FilterReset type="button" onClick={handleFilterReset} />
        </FilterContainer>

        <FilterContainer>
          <Modal
            title={CONST_SOLUTION_NAME}
            description="리스트를 삭제하시겠습니까?"
            actions={{
              primary: {
                title: "삭제",
                onClick: handleDelete,
              },
            }}
          >
            <Button
              type="button"
              color="outlined"
              disabled={JSON.stringify(rowSelection) === "{}"}
            >
              삭제
            </Button>
          </Modal>

          <Button type="button" color="gray">
            등록
          </Button>
        </FilterContainer>
      </Filter>
      <DataTable
        caption="데이터 테이블 예제 테이블"
        columns={Columns}
        data={sampleData}
        totalCount={sampleData.length}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
      />
      <Alert
        title={CONST_SOLUTION_NAME}
        description="등록에 성공했습니다."
        open={isSuccess}
        onOpenChange={setIsSuccess}
        onClick={() => {
          setIsSuccess(false);
        }}
      />
      <Alert
        title={CONST_SOLUTION_NAME}
        description={deleteMutation.error?.message || ""}
        open={deleteMutation.isError}
        onClick={() => {
          deleteMutation.reset();
        }}
      />
    </>
  );
}
