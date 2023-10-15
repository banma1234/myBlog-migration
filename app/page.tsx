import { CardLayout, Banner } from "./components/card";

export default async function Home() {
  const { posts } = await getIndexBoard();

  return (
    <section>
      <Banner />
      <h2>🆕 최신 포스트</h2>
      <CardLayout posts={posts} />
    </section>
  );
}

async function getIndexBoard() {
  const URL = process.env.DEV_URL;

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_INDEX");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data } = await res.json();

  return { posts: data };
}
