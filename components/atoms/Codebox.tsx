import Icon from "@mdi/react";
import { mdiContentCopy } from "@mdi/js";
import React from "react";
import Button from "@components/atoms/button/Button";

interface CodeboxProps {
  code: string;
  language: string;
}
const Codebox = ({ code, language }: CodeboxProps) => {
  return (
    <div>
      <div
        className="flex justify-end items-center gap-2 transform"
        style={{ transform: "translateY(1rem)" }}
      >
        <div className="p-1 px-2 codeblock-lang text-sm font-bold rounded-sm bg-secondary-main">
          {language}
        </div>
        <Button
          size="xs"
          style="secondary"
          onClick={async () => {
            if (!navigator) return;
            await navigator.clipboard
              .writeText(code)
              .then(() => console.log("done"));
          }}
        >
          <Icon path={mdiContentCopy} size={0.7} /> copy
        </Button>
      </div>
      <pre className={`language-${language} mt-0`}>
        <code className={`language-${language}`}>{code}</code>
      </pre>
    </div>
  );
};

export default Codebox;
