import SearchBoard from "./components/clientside/searchBoard";
import getAllPosts from "./getAllPosts";
import styles from "./styles/page.module.scss";

export default async function Search() {
  const data = await getAllPosts();

  return (
    <section className={styles.search}>
      <SearchBoard data={data} />
    </section>
  );
}
