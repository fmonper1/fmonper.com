import marked from "marked";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import Title from "@components/atoms/Title";
import React from "react";
import Codebox from "@components/atoms/Codebox";

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
                className="inline-flex items-end text-primary-main "
              >
                {text}
                <Icon path={mdiOpenInNew} size={0.65} />
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
          return renderToString(<Codebox code={code} language={language} />);
        },
      },
    });
    return { data: marked(markdown), headings };
  },
};

export default MarkdownParser;
