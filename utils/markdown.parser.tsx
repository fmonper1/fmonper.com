import marked, { Renderer } from "marked";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import Title from "@components/atoms/Title";
import React from "react";

const MarkdownParser = {
  parse(markdown: string) {
    const headings = [];

    marked.use({
      // @ts-ignore
      renderer: {
        link(href, title, text) {
          return renderToString(
            <Link href={href}>
              <a
                href={href}
                className="inline-flex items-end text-primary-main underline"
              >
                {text}
                <Icon path={mdiOpenInNew} size={0.75} />
              </a>
            </Link>
          );
        },
        heading(text, level) {
          const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
          headings.push({ text, slug: escapedText, level });
          return renderToString(
            <Title size={level} className={`${level <= 2 ? "pt-3" : ""} group`}>
              <a className="anchor" href={`#${escapedText}`} id={escapedText}>
                <span
                  className="hidden absolute group-hover:inline-block"
                  style={{
                    transform: "translateX(-1.5rem)",
                  }}
                >
                  #
                </span>
                {text}
              </a>
            </Title>
          );
        },
        code(code, language) {
          return renderToString(
            <div>
              <div className="flex justify-end transform">
                <div
                  className="p-1 px-2 codeblock-lang text-sm font-bold rounded-sm bg-secondary-main"
                  style={{ transform: "translateY(1rem)" }}
                >
                  {language}
                </div>
              </div>
              <pre className={`language-${language} mt-0`}>
                <code className={`language-${language}`}>{code}</code>
              </pre>
            </div>
          );
        },
      },
    });
    return { data: marked(markdown), headings };
  },
};

export default MarkdownParser;
