"use client";

import Link from "next/link";

import dynamic from "next/dynamic";

import {
  DetailSection,
  DetailContent,
  DetailTitle,
  DetailFooter,
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
    <DetailSection>
      <DetailTitle>상세 페이지 타이틀 {props.id}</DetailTitle>
      <DetailContent>
        <SafeHtml html="<p>여기는 상세 페이지 내용이 들어가는 곳입니다.</p><p>HTML 콘텐츠를 안전하게 렌더링합니다.</p>" />
      </DetailContent>
      <DetailFooter>
        <Button type="button" color="outlined">
          삭제
        </Button>
        <LinkButton href="/data-table">목록</LinkButton>
      </DetailFooter>
    </DetailSection>
  );
}
