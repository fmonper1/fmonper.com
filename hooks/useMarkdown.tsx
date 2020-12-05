import React, { useEffect, useState } from "react";
import marked, { Renderer } from "marked";
import { renderToString } from "react-dom/server";
import Link from "next/link";
import Icon from "@mdi/react";
import { mdiOpenInNew } from "@mdi/js";
import Title from "@components/atoms/Title";
import * as prism from "prismjs";
import DOMPurify from "dompurify";

const useMarkdown = (markdown: string) => {
  const [html, setHtml] = useState("");
  useEffect(() => {
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
    } as unknown) as Renderer;
    marked.use({ renderer });
    setHtml(DOMPurify.sanitize(marked(markdown)));
  }, []);
  useEffect(() => {
    if (html === "") return;
    prism.highlightAll();
  }, [html]);

  return html;
};

export default useMarkdown;
