import Rss from "rss";
import { headers } from "next/headers";
import { CardType } from "app/components/componentType";

const URL = process.env.DEV_URL;
const DEFAULT_DESCRIPTION =
  "프론트앤드 개발자 ChocoHam(banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.";

export async function GET() {
  const header = headers();
  console.log(header.get("host"));

  const { data } = await getAllPosts();

  const feed = new Rss({
    title: "ChocoHam 개발 블로그",
    description: DEFAULT_DESCRIPTION,
    feed_url: `${URL}/rss.xml`,
    site_url: `${URL}`,
    language: "ko",
  });

  data.forEach((post: CardType) => {
    feed.item({
      title: `${post.title} | ChocoHam`,
      description: post.description || DEFAULT_DESCRIPTION,
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

async function getAllPosts() {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_ALL");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  });
  const { data, success } = await res.json();

  if (!success) {
    throw new Error(data);
  }

  return data;
}
