import {
  PageContainer,
  PageTitle,
  PageBreadcrumb,
} from "@/components/ui/common-layout";

import Main from "@/components/pages/main-page";

export default function Page() {
  return (
    <PageContainer>
      <PageTitle>
        메인
        <PageBreadcrumb
          items={[
            { title: "메뉴1", href: "/" },
            { title: "메뉴2", href: "/" },
          ]}
        />
      </PageTitle>
      <Main />
    </PageContainer>
  );
}
