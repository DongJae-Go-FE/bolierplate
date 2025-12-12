import { PageContainer, PageTitle } from "@/components/ui/common-layout";

import Detail from "@/components/pages/detail-page";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <PageContainer>
      <PageTitle>데이터 테이블 상세 타이틀</PageTitle>
      <Detail id={id} />
    </PageContainer>
  );
}
