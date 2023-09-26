import { CardLayout } from "./components/card";
import SeriesBoard from "./components/clientside/seriesBoard";
import getIndexBoard from "./getIndexBoard";

export default async function Home() {
  const { series, posts } = await getIndexBoard();

  return (
    <section>
      <h1>Chocoham{"'"}s blog</h1>
      <SeriesBoard data={series} />
      {/* <CardHead post={head} /> */}
      <CardLayout posts={posts} />
    </section>
  );
}
