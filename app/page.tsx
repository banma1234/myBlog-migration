import { CardLayout, Banner } from "./components/card";
import { getIndexBoard, getRecommendPost } from "./utils";

export default async function Home() {
  const [newest, recommend] = await Promise.all([
    getIndexBoard(),
    getRecommendPost(),
  ]);

  return (
    <section>
      <Banner />
      <h2>🆕 최신 포스트</h2>
      <CardLayout posts={newest} />
      <h2>👍 추천 포스트</h2>
      <CardLayout posts={recommend} />
    </section>
  );
}
