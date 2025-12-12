"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { useState } from "react";

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

import { customFetch } from "@/lib/network/custom-fetch";

import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  BtnArea,
  LinkButton,
} from "@/components/ui/common-layout";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "@hdc-ui/components/ui/table";

import { Spinner } from "@hdc-ui/components/ui/spinner";

import { Button } from "@hdc-ui/components/ui/button";

import Alert from "@/components/ui/alert";
import Modal from "@/components/ui/modal";

import { CONST_SOLUTION_NAME } from "@/lib/const";

const SafeHtml = dynamic(() => import("@/components/safe-html"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-1 items-center justify-center">
      <Spinner />
    </div>
  ),
});

export default function Detail(props: { id: string }) {
  const { push } = useRouter();
  const queryClient = useQueryClient();

  const [isSuccess, setIsSuccess] = useState(false);

  //TODO. MSW MOCK DATA라 교체해야함
  const { data } = useQuery({
    queryKey: ["item", props.id],
    queryFn: async () => {
      const res = await customFetch(`/api/items/${props.id}`);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "데이터를 불러오는데 실패했습니다");
      }

      return data.data;
    },
  });

  //TODO. MSW MOCK DATA라 교체해야함
  const deleteMutation = useMutation({
    mutationKey: ["deleteItem", props.id],
    mutationFn: async () => {
      const res = await customFetch(`/api/items/${props.id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "삭제에 실패했습니다");
      }

      return data;
    },

    onSuccess: () => {
      setIsSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["items"] });
      setTimeout(() => {
        push("/data-table");
      }, 1500);
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <SectionContainer>
      <SectionTitle className="border-b border-gray-200">
        항목 상세 (ID: {props.id})
      </SectionTitle>
      <SectionContent>
        {data && (
          <Table type="description" className="mb-4">
            <TableCaption>항목 상세 정보</TableCaption>
            <TableBody>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableCell>{data.id}</TableCell>
                <TableHead>제목</TableHead>
                <TableCell>{data.header}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>타입</TableHead>
                <TableCell>{data.type}</TableCell>
                <TableHead>상태</TableHead>
                <TableCell>{data.status}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>Target</TableHead>
                <TableCell>{data.target}</TableCell>
                <TableHead>Limit</TableHead>
                <TableCell>{data.limit}</TableCell>
              </TableRow>
              <TableRow>
                <TableHead>검토자</TableHead>
                <TableCell colSpan={3}>{data.reviewer}</TableCell>
              </TableRow>
              {data.createdAt && (
                <TableRow>
                  <TableHead>생성일</TableHead>
                  <TableCell colSpan={3}>
                    {new Date(data.createdAt).toLocaleString("ko-KR")}
                  </TableCell>
                </TableRow>
              )}
              {data.updatedAt && (
                <TableRow>
                  <TableHead>수정일</TableHead>
                  <TableCell colSpan={3}>
                    {new Date(data.updatedAt).toLocaleString("ko-KR")}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
        <SafeHtml html="<p>여기는 상세 페이지 내용이 들어가는 곳입니다.</p><p>HTML 콘텐츠를 안전하게 렌더링합니다.</p>" />
      </SectionContent>
      <BtnArea>
        <Modal
          title={CONST_SOLUTION_NAME}
          description="삭제하시겠습니까?"
          actions={{
            primary: {
              title: "삭제",
              onClick: handleDelete,
            },
          }}
        >
          <Button type="button" color="outlined">
            삭제
          </Button>
        </Modal>
        <LinkButton href={`/data-table/${props.id}/edit`} color="outlined">
          수정
        </LinkButton>
        <LinkButton href="/data-table">목록</LinkButton>
      </BtnArea>
      <Alert
        title={CONST_SOLUTION_NAME}
        description="삭제되었습니다."
        open={isSuccess}
        onOpenChange={setIsSuccess}
        onClick={() => {
          setIsSuccess(false);
          push("/data-table");
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
    </SectionContainer>
  );
}
