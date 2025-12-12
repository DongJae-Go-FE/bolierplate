import { PageContainer, PageTitle } from "@/components/ui/common-layout";

import Edit from "@/components/pages/edit-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageContainer>
      <PageTitle>데이터 테이블 상세 수정 타이틀</PageTitle>
      <Edit id={id} />
    </PageContainer>
  );
}
