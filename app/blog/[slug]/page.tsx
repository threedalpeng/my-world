import { readFileSync, readdirSync } from "fs";
import * as path from "path";
import { compileBlogMDX } from "./mdx-utils";

interface BlogPageProps {
  params: BlogPageParams;
}
interface BlogPageParams {
  slug: string;
}

const MD_DIR = path.resolve("app", "blog", "md");
export async function generateStaticParams(): Promise<BlogPageParams[]> {
  const files = readdirSync(MD_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.substring(0, file.lastIndexOf(".")),
    }));
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  const markdown = readFileSync(path.resolve(MD_DIR, `${slug}.mdx`), {
    encoding: "utf-8",
  });
  const { content, frontmatter: metadata } = await compileBlogMDX(markdown);

  return (
    <main className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold text-neutral">{metadata.title}</h1>
        <h2 className="text-2xl font-light text-stone-500">
          {metadata.subtitle}
        </h2>
        <div className="flex flex-row gap-2">
          {metadata.tag &&
            metadata.tag.map((t) => (
              <span className="badge badge-neutral" key={t}>
                {t}
              </span>
            ))}
        </div>
      </section>
      <article className="prose lg:prose-xl w-full bg-slate-50 card p-8 prose-code:bg-slate-200 place-self-center">
        {content}
      </article>
    </main>
  );
}
