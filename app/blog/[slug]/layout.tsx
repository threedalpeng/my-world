import { ReactNode } from "react";

export default function BlogPostLayout({ children }: { children: ReactNode }) {
  return <div className="p-8">{children}</div>;
}
