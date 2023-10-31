import PostNavigate from "./components/postNavigate";
import HashTag from "./components/hashTag";
import SeriesBoard from "app/components/clientside/seriesBoard";
import styles from "./styles/page.module.scss";
import Image from "next/image";
import generateRssFeed from "app/generateRSS";
import { CommentBox } from "./components/clientside";
import { getPost, mdParser } from "./utils";
import { CardLayout } from "app/components/card";
import { Metadata } from "next/types";

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
      <header className={styles.header}>
        <Image src={post.thumbnail} alt="thumbnail" layout="fill" />
        <div className={styles.overlap}>
          <h2 className={styles.title}>{post.title}</h2>
        </div>
      </header>
      <h1 className={styles.subTitle}>{post.title}</h1>
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
  const URL = process.env.DEV_URL;

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

  await generateRssFeed();

  return staticData;
}

export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const URL = process.env.DEV_URL;
  const { postId } = params;
  const { post } = await getPost(postId);

  return {
    title: post.title,
    description: post.description || `${post.title} | ChochHam`,
    keywords: post.hashtag,
    bookmarks: `${URL}/posts/${postId}`,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${URL}/posts/${postId}`,
      siteName: "ChocoHam 개발 블로그",
      images: [
        {
          url: post.thumbnail || `${URL}/default_thumbnail.svg`,
          width: 380,
          height: 250,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      creator: "초코햄",
      images: post.thumbnail,
    },
  };
}
