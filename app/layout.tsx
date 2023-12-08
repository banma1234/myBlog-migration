import { AuthProviders } from "util/context/authProvider";
import { NavIcon } from "./components/clientside/navIcon";
import { Noto_Sans_KR } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { globalMetaData } from "./utils";
import { Footer, Header } from "./components";
import styles from "./styles/page.module.scss";
import "styles/globals.scss";

export const metadata: Metadata = globalMetaData;
export const viewPort: Viewport = {
  themeColor: [
    { media: "(data-theme: dark)", color: "#ffffff" },
    { media: "(data-theme: light)", color: "#121418" },
  ],
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
    <html lang="ko" suppressHydrationWarning={true}>
      <head>
        <meta
          name="google-site-verification"
          content="A1qLguIf9gLBQEkoscbYdxPvOgBxPrI3NF0v3FaFDKU"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          href="/rss/feed.xml"
          title="RSS"
        />
        <link
          rel="alternate"
          type="application/json"
          href="/rss/rss.json"
          title="JSON Feed"
        />
      </head>
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
