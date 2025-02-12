import PostNavigate from "./components/postNavigate";
import HashTag from "./components/hashTag";
import SeriesBoard from "app/components/clientside/seriesBoard";
import styles from "./styles/page.module.scss";
import Image from "next/image";
import generateRssFeed from "app/generateRSS";
import Script from "next/script";
import { notFound } from "next/navigation";
import { CommentBox } from "./components/clientside";
import { getPost, mdParser, COPY_CODE } from "./utils";
import { CardLayout } from "app/components/card";
import { Metadata } from "next/types";

export default async function Posts(
  props: {
    params: Promise<{ postId: string }>;
  }
) {
  const params = await props.params;
  const { postId } = params;
  const resData = await getPost(postId).then(res => {
    return res ? res : notFound();
  });

  const { post, recent, bothSidePosts } = resData;
  const recentPosts = recent
    .filter((post: any) => post.postId != postId)
    .slice(-3);

  return (
    <>
      <Script
        id="copyCode"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: COPY_CODE,
        }}
      ></Script>
      <header className={styles.header}>
        <Image src={post.thumbnail} alt="thumbnail" fill sizes="100vw" />
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
        <CardLayout posts={recentPosts} fadeIn={true} />
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const BASE_URL = process.env.DEV_URL as string;

  try {
    const res = await fetch(`${BASE_URL}/api/seo/static-params`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { count }: { count: number } = await res.json();

    const staticData: Array<{ postId: string }> = new Array();
    for (let i = 1; i < count + 1; i++) {
      let target = { postId: i.toString() };
      staticData.push(target);
    }

    await generateRssFeed();

    return staticData;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

export async function generateMetadata(
  props: {
    params: Promise<{ postId: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const BASE_URL = process.env.DEV_URL as string;
  const { postId } = params;
  const resData = await getPost(postId).then(res => {
    return res ? res : notFound();
  });

  const { post } = resData;

  return {
    title: post.title,
    description: post.description || `${post.title} | ChochHam`,
    keywords: post.hashtag.split(" "),
    bookmarks: `${BASE_URL}/posts/${postId}`,
    openGraph: {
      title: {
        absolute: post.title,
      },
      description: post.description,
      url: `${BASE_URL}/posts/${postId}`,
      siteName: "ChocoHam 개발 블로그",
      images: [
        {
          url: post.thumbnail || `${BASE_URL}/default_thumbnail.svg`,
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
      images: post.thumbnail || `${BASE_URL}/default_thumbnail.svg`,
    },
    alternates: {
      canonical: `/posts/${postId}`,
    },
  };
}
