import fs from "fs";
import { Feed } from "feed";

export default async function generateRssFeed() {
  if (process.env.ENVIRONMENT === "develop") {
    return;
  }
  const URL = process.env.DEV_URL as string;
  const data = await getMetaData(URL);
  const date = new Date();
  const author = {
    name: "ChocoHam(@banma1234)",
    email: "banma1234@gmail.com",
    link: "https://github.com/banma1234",
  };

  const feed = new Feed({
    title: "ChocoHam 개발 블로그",
    description:
      "프론트앤드 개발자 ChocoHam(@banma1234)의 개발 & 디자인 블로그입니다. 주로 웹개발 관련 포스트가 올라오며 가끔 디자인/일러스트 관련 포스트 또한 올라옵니다.",
    id: URL,
    link: URL,
    image: `${URL}/banner.png`,
    favicon: `${URL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}`,
    updated: date,
    generator: "chocoham.dev",
    feedLinks: {
      rss2: `${URL}/rss/feed.xml`, // xml format
      json: `${URL}/rss/feed.json`, // json fromat
    },
    author,
  });

  data.map((post: any) => {
    feed.addItem({
      title: post.title,
      id: post.posdId,
      link: `${URL}/posts/${post.postId}`,
      description: post.description,
      author: [author],
      contributor: [author],
      date: new Date(post.uploadDate),
      image: post.thumbnail || "https://chocoham.dev/default_thumbnail.svg",
    });
  });

  fs.mkdirSync(`./public/rss`, {
    recursive: true,
  });
  fs.writeFileSync(`./public/rss/feed.xml`, feed.rss2(), "utf8");
}

async function getMetaData(URL: string) {
  try {
    const res = await fetch(`${URL}/api/seo/meta-tag`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { data } = await res.json();

    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
