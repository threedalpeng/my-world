import { readFileSync, readdirSync } from "fs";
import { MDXRemote, compileMDX } from "next-mdx-remote/rsc";
import * as path from "path";
import rehypeAutolinkHeadings from "rehype-autolink-headings/lib";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

const MD_DIR = path.resolve("app", "blog", "md");
export async function generateStaticParams() {
  const files = readdirSync(MD_DIR);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.substring(0, file.lastIndexOf("."));
      return {
        slug: slug,
      };
    });
}

interface BlogPostFrontmatter {
  title: string;
  subtitle: string;
  tag: string;
}

interface BlogPostMetadata {
  title: string;
  subtitle: string;
  tag: string[];
}

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const markdown = readFileSync(path.resolve(MD_DIR, `${slug}.mdx`), {
    encoding: "utf-8",
  });
  const { content, frontmatter } = await compileMDX<BlogPostFrontmatter>({
    source: markdown,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, [remarkToc, { heading: "목차" }]],
        rehypePlugins: [rehypeSlug, rehypeAutolinkHeadings],
      },
      parseFrontmatter: true,
    },
  });
  const metadata = {
    ...frontmatter,
    tag: frontmatter.tag.split(",").map((t) => t.trim()),
  };

  return (
    <main className="flex flex-col gap-12">
      <section className="flex flex-col gap-4">
        <h1 className="text-6xl font-bold text-neutral">{metadata.title}</h1>
        <h2 className="text-2xl font-light text-stone-500">
          {metadata.subtitle}
        </h2>
        <div className="flex flex-row gap-2">
          {metadata.tag.map((t) => (
            <span className="badge" key={t}>
              {t}
            </span>
          ))}
        </div>
      </section>
      <article className="prose dark:prose-invert">{content}</article>
    </main>
  );
}
