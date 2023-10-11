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

export async function getAllPosts() {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_ALL");

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data, success } = await res.json();

  if (!success) {
    console.log(data);
    return;
  }

  return data;
}
