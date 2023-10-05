import styles from "./styles/page.module.scss";
import { TOC } from "./components/clientside";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.article}>
      <aside className={styles.TOC}>
        <TOC />
      </aside>
      <article className="postArticle">{children}</article>
    </div>
  );
}
