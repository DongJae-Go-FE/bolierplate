"use client";

import { useRouter } from "next/navigation";

import { useState } from "react";

//import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";

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

import { customFetch } from "@/lib/network/custom-fetch";

import useFilter from "@/hooks/use-filter";

import { CONST_SOLUTION_NAME, CONST_SEARCH_PLACEHOLDER } from "@/lib/const";

import sampleData from "./data.json";

export default function TablePage() {
  const { push } = useRouter();

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [isSuccess, setIsSuccess] = useState(false);

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

  //data, isLoading 추가
  // const { refetch } = useQuery({
  //   queryKey: [QueryKey.EXAMPLE, query],
  //   queryFn: () => 함수명({ ...filter }),
  // });

  const deleteMutation = useMutation({
    mutationKey: ["deleteExample"],
    mutationFn: async (payload: RowSelectionState) => {
      const res = await customFetch(`/api/example`, {
        method: "delete",
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg);
      }

      return res;
    },

    onSuccess: () => {
      setIsSuccess(true);
      //refetch();
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
