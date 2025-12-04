import { Section, SectionTitle } from "@/components/ui/common-layout";

import DataTableDetailPage from "@/components/pages/detail-page";

export default function Page(params: { id: string }) {
  const { id } = params;

  return (
    <Section>
      <SectionTitle>임시 타이틀</SectionTitle>
      <DataTableDetailPage id={id} />
    </Section>
  );
}
