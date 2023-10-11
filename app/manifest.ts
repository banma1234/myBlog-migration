import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ChocoHam 개발 블로그",
    short_name: "ChocoHam 블로그",
    description:
      "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
