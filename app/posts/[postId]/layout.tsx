import styles from "./styles/page.module.scss";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <article className={styles.article}>{children}</article>
    </>
  );
}
