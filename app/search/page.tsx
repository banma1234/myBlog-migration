import getAllPosts from "./getAllPosts";
import SearchBoard from "./components/clientside/searchBoard";
import styles from "./styles/page.module.scss";

export default async function Search() {
  const { data } = await getAllPosts();

  return (
    <section className={styles.search}>
      <SearchBoard data={data} />
    </section>
  );
}
