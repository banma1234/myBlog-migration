import prism from "prismjs";
import { marked } from "marked";

import "../styles/prism_custom.scss";
import "../styles/mdParserStyle.scss";

import "prismjs/components/prism-javascript";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-json";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";

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

        <button onClick="copyCode(this)">
          <div class="tooltip">
            ${copyIcon}
            <span class="tooltip__text">코드 복사</span>
          </div>
        </button>

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

const copyIcon = `<svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#f0f3f5"
          className="bi bi-clipboard"
          viewBox="0 0 16 16"
        >
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
        </svg>`;
