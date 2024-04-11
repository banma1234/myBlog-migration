import type { Metadata } from "next";

const URL = process.env.DEV_URL as string;

const globalMetaData: Metadata = {
  creator: "ChocoHam(@banma1234)",
  applicationName: "ChocoHam 개발 블로그",
  description:
    "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
  title: {
    template: "%s | ChocoHam",
    default: "ChocoHam 개발 블로그",
  },
  formatDetection: { email: true },
  openGraph: {
    title: "ChocoHam 개발 블로그",
    type: "website",
    locale: "ko",
    description:
      "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
    url: `${URL}`,
    siteName: "ChocoHam 개발 블로그",
    images: [
      {
        url: "https://choco-image-server.cdn.ntruss.com/images/banner.png",
        width: 380,
        height: 250,
      },
    ],
  },
  manifest: `${URL}/manifest.json`,
  robots: `${URL}/robots.txt`,
};

export default globalMetaData;
