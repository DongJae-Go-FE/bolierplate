import { PageContainer, PageTitle } from "@/components/ui/common-layout";

import Edit from "@/components/pages/edit-page";

export default function Page(params: { id: string }) {
  const { id } = params;
  return (
    <PageContainer>
      <PageTitle>임시 타이틀</PageTitle>
      <Edit id={id} />
    </PageContainer>
  );
}
