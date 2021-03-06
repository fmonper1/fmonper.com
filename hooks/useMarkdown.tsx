import React, { useEffect, useState } from "react";
import * as prism from "prismjs";
import DOMPurify from "dompurify";
import MarkdownParser from "@utils/markdown.parser";

const useMarkdown = (markdown: string) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    if (!markdown) return;
    const parsed = MarkdownParser.parse(markdown);
    setHtml(DOMPurify.sanitize(parsed));
  }, []);
  useEffect(() => {
    if (html === "") return;
    prism.highlightAll();
  }, [html]);

  return html;
};

export default useMarkdown;
