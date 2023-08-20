import { marked } from "marked";
// import { markedHighlight } from "marked-highlight";
// import hljs from "highlight.js";
// import Prism from "prismjs";
// import loadLanguages from "prismjs/components/";
// import "prismjs/themes/prism-tomorrow.css";
import "./styles/mdParserStyle.scss";

export default function mdParser(content: string) {
  // loadLanguages(["js", "ts", "html", "jsx", "tsx", "python", "bash"]);
  // const marked = new Marked(
  //   markedHighlight({
  //     langPrefix: "hljs language-",
  //     highlight(code, lang) {
  //       const language = hljs.getLanguage(lang) ? lang : "plaintext";
  //       return hljs.highlight(code, { language }).value;
  //     },
  //   })
  // );

  const renderer = new marked.Renderer();
  /*
    코드블럭 스타일 변경
  */
  renderer.code = (code: string, lang: string | undefined): string => {
    const langClass = lang ? lang : "plain-text";

    const line = code
      .split("\n")
      .map(
        (item: string, i: number) => `
          <tr data-line=${i + 1}>
            <td class="line-index" data-number="${i + 1}">${i + 1}</td>
            <td class="line-code" data-number=${i + 1}>${item}</td>
          </tr>
        `
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
    const escapedText = text.toLowerCase().replace(/[^\w]+/g, "-");
    return `
            <h${level}>
              <a name="${escapedText}" class="anchor" href="#${escapedText}">
                <span class="header-link"></span>
              </a>
              ${text}
            </h${level}>`;
  };

  marked.use({
    gfm: true, // github의 md style 사용
    renderer: renderer,
    // highlight: function (code: string) {
    //   return hljs.highlightAuto(code).value;
    // },
    // highlight(code: string, lang: string | undefined) {
    //   return lang ? hljs.highlight(lang, code).value : "plaintext";
    // },
  });

  // marked.setOptions({
  //   highlight: function (code: string) {
  //     return hljs.highlightAuto(code).value;
  //   },
  // });

  // marked.use(
  //   markedHighlight({
  //     async: true,
  //     langPrefix: "hljs language-",
  //     highlight(code, lang) {
  //       const language = hljs.getLanguage(lang) ? lang : "plaintext";
  //       return hljs.highlight(code, { language }).value;
  //     },
  //   })
  // );

  const rawMd = marked.parse(content);

  return { __html: rawMd };
}
