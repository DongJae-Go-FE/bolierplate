import { PageContainer, PageTitle } from "@/components/ui/common-layout";

import DataTableDetailPage from "@/components/pages/detail-page";

export default function Page(params: { id: string }) {
  const { id } = params;

  return (
    <PageContainer>
      <PageTitle>임시 타이틀</PageTitle>
      <DataTableDetailPage id={id} />
    </PageContainer>
  );
}
