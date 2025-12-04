"use client";

import dynamic from "next/dynamic";

import {
  SectionContainer,
  SectionTitle,
  SectionContent,
  BtnArea,
  LinkButton,
} from "@/components/ui/common-layout";

import { Spinner } from "@hdc-ui/components/ui/spinner";

import { Button } from "@hdc-ui/components/ui/button";

const SafeHtml = dynamic(() => import("@/components/safe-html"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center">
      <Spinner />
    </div>
  ),
});

export default function Detail(props: { id: string }) {
  return (
    <SectionContainer>
      <SectionTitle className="border-b border-gray-200">
        상세 페이지 타이틀 {props.id}
      </SectionTitle>
      <SectionContent>
        <SafeHtml html="<p>여기는 상세 페이지 내용이 들어가는 곳입니다.</p><p>HTML 콘텐츠를 안전하게 렌더링합니다.</p>" />
      </SectionContent>
      <BtnArea>
        <Button type="button" color="outlined">
          삭제
        </Button>
        <LinkButton href="/data-table">목록</LinkButton>
      </BtnArea>
    </SectionContainer>
  );
}
