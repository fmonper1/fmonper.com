import marked, { Renderer } from "marked";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import Title from "@components/atoms/Title";
import React from "react";
import DOMPurify from "dompurify";

const MarkdownParser = {
  parse(markdown: string) {
    const renderer: Renderer = ({
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
        return renderToString(
          <Title size={level} className={level <= 2 ? "pt-3" : ""}>
            <>
              <a className="anchor" href={`#${escapedText}`}>
                <span className="mr-2">#</span>
              </a>
              {text}
            </>
          </Title>
        );
      },
      code(code, language) {
        return renderToString(
          <div>
            <div className="codeblock-lang text-sm font-bold p-2 px-4 bg-secondary-main -mb-0 flex">
              {language}
            </div>
            <pre className={`language-${language} mt-0`}>
              <code className={`language-${language}`}>{code}</code>
            </pre>
          </div>
        );
      },
    } as unknown) as Renderer;
    marked.use({ renderer });
    return marked(markdown);
  },
};

export default MarkdownParser;
