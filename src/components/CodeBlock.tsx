import { useMemo } from "react";
import hljs from "highlight.js/lib/core";
import bash from "highlight.js/lib/languages/bash";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github.css";
import { CodeExample } from "../data/lessons";

hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("bash", bash);

export function CodeBlock({ example }: { example: CodeExample }) {
  const highlightedLines = useMemo(() => {
    const html = hljs.highlight(example.code, { language: example.language }).value;
    return html.split("\n");
  }, [example]);

  return (
    <figure className="code-card">
      <figcaption>{example.title}</figcaption>
      <pre>
        <code>
          {highlightedLines.map((line, index) => {
            const lineNumber = index + 1;
            const focused = example.focusLines.includes(lineNumber);

            return (
              <span className={focused ? "code-line code-line-focus" : "code-line"} key={lineNumber}>
                <span className="code-line-number">{lineNumber}</span>
                <span className="code-line-content" dangerouslySetInnerHTML={{ __html: line || " " }} />
              </span>
            );
          })}
        </code>
      </pre>
    </figure>
  );
}
