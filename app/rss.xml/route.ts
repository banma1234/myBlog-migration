import Rss from "rss";
import getSearchInfo from "app/search/getSearchInfo";
import { CardType } from "app/components/componentType";

const URL = process.env.DEV_URL;

export async function GET() {
  const { data } = await getSearchInfo();

  const feed = new Rss({
    title: "Choco Ham(banma1234)의 개발 블로그",
    description:
      "프론트앤드 개발자 Choco Ham(banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
    feed_url: `${URL}/rss.xml`,
    site_url: `${URL}`,
    language: "ko",
  });

  data.forEach((post: CardType) => {
    feed.item({
      title: `${post.title} | `,
      description: post.description || "doTest",
      url: `${URL}/posts/${post.postId}`,
      guid: `${URL}/blog/${post._id}`,
      date: new Date(post.uploadDate),
    });
  });

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
