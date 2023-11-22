import { CardLayout, Banner } from "./components/card";
import { getIndexBoard, getRecommendPost } from "./utils";

export default async function Home() {
  const [index, recommend] = await Promise.all([
    getIndexBoard(),
    getRecommendPost(),
  ]);

  return (
    <section>
      <Banner />
      <h2>🆕 최신 포스트</h2>
      <CardLayout posts={index.data} />
      <h2>👍 추천 포스트</h2>
      <CardLayout posts={recommend.data} />
      <h2>🆕 시리즈별로 보기</h2>
    </section>
  );
}
