import { CardLayout, Banner } from "./components/card";
import getIndexBoard from "./getIndexBoard";

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
