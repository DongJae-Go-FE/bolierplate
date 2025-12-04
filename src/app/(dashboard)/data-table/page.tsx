import { PageTitle, PageContainer } from "@/components/ui/common-layout";

import DataTablePage from "@/components/pages/list-page";

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>데이터 테이블 타이틀</PageTitle>
      <DataTablePage />
    </PageContainer>
  );
}
