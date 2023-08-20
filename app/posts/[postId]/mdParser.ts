import { marked } from "marked";
// import prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
import "./styles/mdParserStyle.scss";

export default function mdParser(content: string) {
  const renderer = new marked.Renderer();
  /*
    코드블럭 스타일 변경
  */
  renderer.code = (code: string, lang: string | undefined): string => {
    if (lang && renderer?.options?.highlight) {
      code = renderer.options.highlight(code, lang as string) as string;
      const langClass = "language-" + lang;
      return `
            <div class="codeblock">
                <div class="top">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <pre class="${langClass}">
                    ${code}
                </pre>
            </div>
        `;
    } else {
      lang = "unknown";
      const langClass = "language-" + lang;
      return `
            <div class="codeblock">
                <div class="top">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <pre class="${langClass}">
                    ${code}
                </pre>
            </div>
        `;
    }
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
    // highlight: function (code: string, lang: string | undefined) {
    //   if (lang) {
    //     return prism.highlight(code, prism.languages[lang], lang);
    //   } else {
    //     return code;
    //   }
    // },
  });

  const rawMd = marked.parse(content);

  return { __html: rawMd };
}
