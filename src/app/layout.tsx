import type { Metadata } from "next";

import ReactQueryProvider from "@/components/react-query-provider";
import CommonProvider from "@/components/common-provider";

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
        <ReactQueryProvider>
          <CommonProvider>{children}</CommonProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
