import styles from "./styles/page.module.scss";
import { TOC } from "./components/clientside";
import type { Metadata } from "next";

export default function ArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <article className={styles.article}>
        <section className={styles.article}>{children}</section>
      </article>
      <aside className={styles.TOC}>
        <TOC />
      </aside>
    </>
  );
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
  const res = await fetch(`${URL}/api/metadata/${postId}`, {
    method: "GET",
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
