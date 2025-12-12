"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { customFetch } from "@/lib/network/custom-fetch";

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

import { RowSelectionState } from "@tanstack/react-table";

import Columns from "./columns";

import useFilter from "@/hooks/use-filter";

import { CONST_SOLUTION_NAME, CONST_SEARCH_PLACEHOLDER } from "@/lib/const";

export default function TablePage() {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const { filter, setFilter, handleFilterSubmit, handleFilterReset, query } =
    useFilter<{
      search: string;
      value: string;
      valueTwo: string;
    }>({
      initialState: {
        search: "",
        value: "전체",
        valueTwo: "샘플1",
      },
    });

  //TODO. MSW MOCK DATA라 교체해야함
  const { data, isLoading } = useQuery({
    queryKey: ["items", page, pageSize, query],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        search: query.search || "",
      });

      const res = await customFetch(`/api/items?${params}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "데이터를 불러오는데 실패했습니다");
      }

      return data;
    },
  });

  //TODO. MSW MOCK DATA라 교체해야함
  const deleteMutation = useMutation({
    mutationKey: ["deleteItems"],
    mutationFn: async (payload: RowSelectionState) => {
      const selectedIndices = Object.keys(payload).map(Number);
      const ids = selectedIndices
        .map((index) => data?.data[index]?.id)
        .filter(Boolean) as number[];

      const res = await customFetch(`/api/items/delete-many`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ids }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "삭제에 실패했습니다");
      }

      return result;
    },

    onSuccess: () => {
      setIsSuccess(true);
      setRowSelection({});
      queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(rowSelection);
  };

  const rowSelectionLength = Object.keys(rowSelection).length;

  return (
    <>
      <Filter>
        <FilterContainer>
          <CommonFilter
            value={filter.value}
            onChange={(value) => {
              setFilter((prev) => ({
                ...prev,
                value: value,
              }));
            }}
          />
          <Input
            value={filter.search}
            onChange={(value) => {
              setFilter((prev) => ({
                ...prev,
                search: value.target.value,
              }));
            }}
            className="w-80"
            placeholder={CONST_SEARCH_PLACEHOLDER}
          />
          <SampleFirstFilter
            value={filter.valueTwo}
            onChange={(value) => {
              setFilter((prev) => ({
                ...prev,
                valueTwo: value,
              }));
            }}
          />
          <FilterSearch
            type="button"
            onClick={() => {
              setPage(1);
              handleFilterSubmit();
            }}
          />
          <FilterReset
            type="button"
            onClick={() => {
              setPage(1);
              handleFilterReset();
            }}
          />
        </FilterContainer>

        <FilterContainer>
          <Modal
            title={CONST_SOLUTION_NAME}
            description={`${rowSelectionLength}개 리스트를 삭제하시겠습니까?`}
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

          <Button
            type="button"
            color="gray"
            onClick={() => {
              push("/data-table/add");
            }}
          >
            등록
          </Button>
        </FilterContainer>
      </Filter>
      <DataTable
        caption="데이터 테이블 예제 테이블"
        columns={Columns}
        data={data?.data || []}
        totalCount={data?.pagination?.total || 0}
        pageSize={pageSize}
        currentPage={page}
        onPageChange={(newPage) => {
          setRowSelection({});
          setPage(newPage);
        }}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        isLoading={isLoading}
      />
      <Alert
        title={CONST_SOLUTION_NAME}
        description="리스트를 삭제에 성공했습니다."
        open={isSuccess}
        onOpenChange={setIsSuccess}
        onClick={() => {
          setIsSuccess(false);
        }}
      />
      <Alert
        title={CONST_SOLUTION_NAME}
        description={
          deleteMutation.error?.message || "알 수 없는 오류가 발생했습니다"
        }
        open={deleteMutation.isError}
        onClick={() => {
          deleteMutation.reset();
        }}
      />
    </>
  );
}
