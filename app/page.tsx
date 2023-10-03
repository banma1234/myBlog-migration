import { CardLayout } from "./components/card";
import getIndexBoard from "./getIndexBoard";

export default async function Home() {
  const { posts } = await getIndexBoard();

  return (
    <section>
      <h1>Chocoham{"'"}s blog</h1>
      <CardLayout posts={posts} />
    </section>
  );
}
