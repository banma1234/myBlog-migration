import PostNavigate from "./components/postNavigate";
import HashTag from "./components/hashTag";
import SeriesBoard from "app/components/clientside/seriesBoard";
import styles from "./styles/page.module.scss";
import { CommentBox } from "./components/clientside";
import { getPost, mdParser } from "./utils";
import { CardLayout } from "app/components/card";
import type { Metadata } from "next";

export default async function Posts({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const { post, recent, bothSidePosts } = await getPost(postId);
  const recentPosts = recent
    .filter((post: any) => post.postId != postId)
    .slice(-3);

  return (
    <>
      <header>
        <h1 className={styles.title}>{post.title}</h1>
      </header>
      <SeriesBoard data={recent} postId={Number(postId)} />
      <div
        className={styles.post}
        dangerouslySetInnerHTML={mdParser(post.content)}
      />
      <HashTag hashTag={post.hashtag} />
      <nav className={styles.navigate}>
        <PostNavigate both={bothSidePosts} />
      </nav>
      <article className={styles.comment}>
        <CommentBox postId={Number(postId)} />
      </article>
      <section className={styles.recent}>
        <h2>👨‍💻 관련 포스트</h2>
        <CardLayout posts={recentPosts} />
      </section>
    </>
  );
}

export async function generateStaticParams() {
  let URL = process.env.DEV_URL;

  if (typeof URL === undefined) {
    URL = "https://chocoham.dev";
  }

  const myHeaders = new Headers();
  myHeaders.append("viewtype", "GET_STATIC_PARAMS");
  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const resData = await res.json();

  if (!resData.success) {
    throw new Error(resData.data);
  }

  const staticData: Array<{ postId: string }> = new Array();
  for (let i = 1; i < resData.data + 1; i++) {
    let target = { postId: i.toString() };
    staticData.push(target);
  }

  return staticData;
}

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  let URL = process.env.DEV_URL;

  if (typeof URL === undefined) {
    URL = "https://chocoham.dev";
  }

  const { postId } = params;
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("postid", postId);

  const res = await fetch(`${URL}/api/metadata`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data, success } = await res.json();

  if (!success) {
    throw new Error(data);
  }
  const metaData = data[0];

  return {
    title: metaData.title,
    description: metaData.description,
    keywords: metaData.hashtag,
    bookmarks: [`${URL}/posts/${postId}`],
    openGraph: {
      title: metaData.title,
      description: metaData.description,
      url: `${URL}/posts/${postId}`,
      siteName: "ChocoHam 개발 블로그",
      images: [{ url: metaData.thumbnail, width: 380, height: 250 }],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: metaData.title,
      description: metaData.description,
      creator: "초코햄",
      images: [metaData.thumbnail],
    },
  };
}
