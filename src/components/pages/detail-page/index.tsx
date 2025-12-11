"use client";

import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

import { useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  BtnArea,
  LinkButton,
} from "@/components/ui/common-layout";

import { Spinner } from "@hdc-ui/components/ui/spinner";

import { Button } from "@hdc-ui/components/ui/button";

import Alert from "@/components/ui/alert";
import Modal from "@/components/ui/modal";

import { customFetch } from "@/lib/network/custom-fetch";

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

  const qc = useQueryClient();

  const [isSuccess, setIsSuccess] = useState(false);

  const deleteMutation = useMutation({
    mutationKey: ["deleteExample"],
    mutationFn: async () => {
      const res = await customFetch(`/api/example/${props.id}`, {
        method: "delete",
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.msg);
      }

      return res;
    },

    onSuccess: () => {
      setIsSuccess(true);
      //리스트 쿼리 갱신
      qc.invalidateQueries({
        queryKey: ["리스트 쿼리키"],
      });
      push("/data-table");
    },
  });

  const handleDelete = async () => {
    await deleteMutation.mutateAsync();
  };

  return (
    <SectionContainer>
      <SectionTitle className="border-b border-gray-200">
        상세 페이지 타이틀 {props.id}
      </SectionTitle>
      <SectionContent>
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
        <LinkButton href={`/data-table/${props.id}/edit`}>수정</LinkButton>
        <LinkButton href="/data-table">목록</LinkButton>
      </BtnArea>
      <Alert
        title={CONST_SOLUTION_NAME}
        description="삭제 되었습니다."
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
    </SectionContainer>
  );
}
