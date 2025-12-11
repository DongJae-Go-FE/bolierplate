import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "대시보드",
  description: "로그인 정보가 없을 경우",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-dvh w-dvw flex-col items-center justify-center bg-gray-100 py-4">
      {children}
    </main>
  );
}
