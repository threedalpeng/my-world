import "./globals.css";
import localFont from "next/font/local";

const myFont = localFont({
  src: "./assets/fonts/Pretandard/woff2/PretendardVariable.woff2",
});

export const metadata = {
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
      <body className={myFont.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
