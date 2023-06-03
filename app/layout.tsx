import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

const Pretandard = localFont({
  src: "./assets/fonts/Pretandard/woff2/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretandard",
});
const D2Coding = localFont({
  src: "./assets/fonts/D2Coding/D2Coding.woff2",
  display: "swap",
  variable: "--font-d2coding",
});

export const metadata: Metadata = {
  title: "Dalpeng's World",
  description: "My world!",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${Pretandard.variable} ${D2Coding.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
