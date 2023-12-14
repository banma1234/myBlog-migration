import styles from "./styles/page.module.scss";
import { TOC } from "./components/clientside";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <article>
        <section>{children}</section>
      </article>
      <aside className={styles.TOC}>
        <TOC />
      </aside>
    </>
  );
}
