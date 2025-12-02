import { Section, SectionTitle } from "@/components/ui/common-layout";

import Main from "@/components/pages/main-page";

import { SectionBreadcrumb } from "@/components/ui/common-layout";

export default function Page() {
  return (
    <Section>
      <SectionTitle>
        메인
        <SectionBreadcrumb
          items={[
            { title: "메뉴1", href: "/" },
            { title: "메뉴2", href: "/" },
          ]}
        />
      </SectionTitle>

      <Main />
    </Section>
  );
}
