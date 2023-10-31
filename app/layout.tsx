import "styles/globals.scss";
import styles from "./styles/page.module.scss";
import { AuthProviders } from "util/context/authProvider";
import { NavIcon } from "./components/clientside/navIcon";
import { Noto_Sans_KR } from "next/font/google";
import type { Metadata } from "next";
import { Footer, Header } from "./components";

export const metadata: Metadata = {
  creator: "ChocoHam(@banma1234)",
  applicationName: "ChocoHam 개발 블로그",
  description:
    "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
  title: {
    template: "%s | ChocoHam",
    default: "ChocoHam 개발 블로그",
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "ChocoHam 개발 블로그",
    description:
      "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
    url: "https://chocoham.dev",
    siteName: "ChocoHam 개발 블로그",
    images: [
      { url: "https://chocoham.dev/banner.png", width: 380, height: 250 },
    ],
  },
  manifest: "https://chocoham.dev/manifest.json",
};

const myFont = Noto_Sans_KR({
  weight: ["400"],
  subsets: ["latin"],
  fallback: ["-apple-system", "Apple SD Gothic Neo", "Roboto", "sans-serif"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={myFont.className}>
        <AuthProviders>
          <Header />
          <main className={styles.main}>
            <aside />
            {children}
            <NavIcon />
            <aside />
          </main>
          <Footer />
        </AuthProviders>
      </body>
    </html>
  );
}
