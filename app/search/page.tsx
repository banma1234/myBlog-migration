import SearchBoard from "./components/clientside/searchBoard";
import styles from "./styles/page.module.scss";

export default async function Search() {
  const data = await getAllPosts();

  return (
    <section className={styles.search}>
      <SearchBoard data={data} />
    </section>
  );
}

async function getAllPosts() {
  let URL = process.env.DEV_URL;

  if (typeof URL === undefined) {
    URL = "https://chocoham.dev";
  }

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_ALL");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data, success } = await res.json();

  if (!success) {
    throw new Error(data);
  }

  return data;
}
