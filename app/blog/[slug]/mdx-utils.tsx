import { selectAll } from "hast-util-select";
import { Element } from "hastscript/lib/core";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";
import Callout from "../components/Callout";
import PaperClipIcon from "./PaperClipIconForHast";
import Link from "next/link";

interface BlogPostMetadata {
  title: string;
  subtitle: string;
  tag: string[];
}

export function compileBlogMDX(markdown: string) {
  return compileMDX<BlogPostMetadata>({
    source: markdown,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm, [remarkToc, { heading: "목차" }]],
        rehypePlugins: [
          rehypeSlug,
          [plugin.addClasses, { "h1,h2,h3,h4,h5,h6": "group/headings" }],
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              content: PaperClipIcon,
            },
          ],
          [rehypePrism],
        ],
      },
      parseFrontmatter: true,
    },
    components: {
      Callout,
      a: ({ children, href, ...props }) => {
        if (href?.startsWith("#")) {
          return (
            <a {...props} href={href}>
              {children}
            </a>
          );
        }
        return (
          <Link {...props} ref={undefined} href={href || ""}>
            {children}
          </Link>
        );
      },
    },
  });
}

export const plugin = {
  addClasses: (additions: Record<string, string>) => {
    function adder([selector, className]: [string, string]) {
      const writer = write(className);
      return (node: Element) => selectAll(selector, node).forEach(writer);
    }
    function write(className: string) {
      return function (node: Element) {
        var properties = node.properties;
        if (!properties) {
          node.properties = { className };
        } else {
          if (!properties.className) properties.className = className + " ";
          else properties.className += className + " ";
        }
      };
    }
    const adders = Object.entries(additions).map(adder);
    return (node: Element) => adders.forEach((a) => a(node));
  },
};
