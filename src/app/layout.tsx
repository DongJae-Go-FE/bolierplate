import type { Metadata } from "next";

import ReactQueryProvider from "@/components/react-query-provider";
import CommonProvider from "@/components/common-provider";
import { MSWProvider } from "@/components/msw-provider";

import localFont from "next/font/local";

import "./globals.css";

const pretendard = localFont({
  src: [
    {
      path: "../../public/fonts/pretendard/woff2/Pretendard-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/pretendard/woff2/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/pretendard/woff2/Pretendard-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/pretendard/woff2/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/pretendard/woff2/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "HDC LABS NEXT.JS Boilerplate",
  description: "구성중",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendard.className}>
        {/* TODO: 실 서버 API 사용 시 MSWProvider를 제거하고 실제 API 호출로 대체 */}
        <MSWProvider>
          <ReactQueryProvider>
            <CommonProvider>{children}</CommonProvider>
          </ReactQueryProvider>
        </MSWProvider>
      </body>
    </html>
  );
}
