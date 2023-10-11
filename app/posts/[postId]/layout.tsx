import styles from "./styles/page.module.scss";
import { TOC } from "./components/clientside";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <article className={styles.article}>
        <section className={styles.article}>{children}</section>
      </article>
      <aside className={styles.TOC}>
        <TOC />
      </aside>
    </>
  );
}
