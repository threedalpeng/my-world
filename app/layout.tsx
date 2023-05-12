import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

const Pretandard = localFont({
  src: "./assets/fonts/Pretandard/woff2/PretendardVariable.woff2",
});

export const metadata: Metadata = {
  title: "Dalpeng's World",
  description: "My world!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={Pretandard.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
