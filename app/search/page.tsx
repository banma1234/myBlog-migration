import type { Metadata } from "next";
import SearchBoard from "./components/clientside/searchBoard";
import getAllPosts from "./getAllPosts";
import styles from "./styles/page.module.scss";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function Search() {
  const data = await getAllPosts();

  return (
    <section className={styles.search}>
      <SearchBoard data={data} />
    </section>
  );
}
