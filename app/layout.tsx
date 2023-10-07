import "styles/globals.scss";
import styles from "./styles/page.module.scss";
import { NavIcon } from "./components/clientside/navIcon";
import { Noto_Sans_KR } from "next/font/google";
import type { Metadata } from "next";
import { Footer, Header } from "./components";

export const metadata: Metadata = {
  creator: "초코햄(banma1234)",
  applicationName: "ChocoHam 블로그",
  title: {
    template: "%s | ChocoHam",
    default: "Choco Ham(@banma1234)의 개발 & 디자인 블로그",
  },
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
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
        <Header />
        <main className={styles.main}>
          <aside />
          {children}
          <NavIcon />
          <aside />
        </main>
        <Footer />
      </body>
    </html>
  );
}
