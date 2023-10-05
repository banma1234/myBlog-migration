import "styles/globals.scss";
import styles from "./styles/page.module.scss";
import { NavIcon } from "./components/clientside/navIcon";
import { Noto_Sans_KR } from "next/font/google";
import type { Metadata } from "next";
import { Footer, Header } from "./components";

export const metadata: Metadata = {
  title: "초코햄의 개발 블로그",
  description: "디발자, 개자이너의 개발 블로그",
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
