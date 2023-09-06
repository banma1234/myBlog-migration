import { CardHead, CardLayout } from "./components/card";
import getIndexBoard from "./getIndexBoard";

export default async function Home() {
  const { head, posts } = await getIndexBoard();

  return (
    <section>
      <h1>Chocoham{"'"}s blog</h1>
      <CardHead post={head} />
      <CardLayout posts={posts} />
    </section>
  );
}
