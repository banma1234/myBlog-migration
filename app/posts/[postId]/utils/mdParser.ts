import { marked } from "marked";
import prism from "prismjs";

import "../styles/prism_custom.scss";
import "../styles/mdParserStyle.scss";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-css";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-cshtml";
import "prismjs/components/prism-python";

export default function mdParser(content: string) {
  /*
    코드 하이라이트 with prism
  */
  marked.setOptions({
    highlight: (code: string, lang: string | undefined) => {
      if (lang && prism.languages[lang]) {
        return prism.highlight(code, prism.languages[lang], lang);
      } else {
        return code;
      }
    },
  });

  const renderer = new marked.Renderer();
  /*
    코드블럭 스타일 변경
  */
  renderer.code = (code: string, lang: string | undefined): string => {
    const langClass = lang ? lang : "plain-text";

    if (lang && renderer?.options?.highlight) {
      code = renderer.options.highlight(code, lang as string) as string;
    }

    const line = code
      .split("\n")
      .map(
        (item: string, i: number) => `
          <tr data-line=${i + 1}>
            <td class="line-index" data-number="${i + 1}">${i + 1}</td>
            <td class="line-code" data-number=${i + 1}>${item}</td>
          </tr>
        `,
      )
      .join("\n")
      .replace(/\t|\\n/, "");

    return `
        <div class="codeblock">
          <div class="top">
            <div></div>
            <div></div>
            <div></div>
          </div>
          <pre class="language-${langClass}">
            <table>
              <tbody>${line}</tbody>
            </table>
          </pre>
        </div>
        `;
  };
  /*
    h1, h2 등 제목 태그에 포커스 링크 삽입
  */
  renderer.heading = (text: string, level: number) => {
    const escapedText = text.toLowerCase().replace(/\s/g, "-").trim();
    return `
            <h${level} class="md_header" id="${escapedText}">
              ${text}
            </h${level}>`;
  };

  marked.use({
    gfm: true, // github의 md style 사용
    renderer: renderer,
  });

  const rawMd = marked.parse(content);

  return { __html: rawMd };
}
