import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authConfig } from "../auth";
import { redirect } from "next/navigation";
import styles from "../styles/page.module.scss";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  }
};

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  if (session) {
    redirect("/");
  }

  return <article className={styles.login}>{children}</article>;
}
