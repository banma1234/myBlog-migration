import type { Metadata } from "next";
import styles from "../styles/page.module.scss";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <article className={styles.login}>{children}</article>;
}
