import PostNavigate from "./components/postNavigate";
import HashTag from "./components/hashTag";
import SeriesBoard from "app/components/clientside/seriesBoard";
import styles from "./styles/page.module.scss";
import { CommentBox } from "./components/clientside";
import { mdParser } from "./utils";
import { CardLayout } from "app/components/card";

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

async function getPost(postId: string) {
  const URL = process.env.DEV_URL || "";
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_POST");
  myHeaders.append("postid", postId);

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data, recent, bothSidePosts } = await res.json();

  return {
    post: data[0],
    recent: recent,
    bothSidePosts: bothSidePosts,
  };
}

export async function generateStaticParams() {
  const URL = process.env.DEV_URL || "";
  const myHeaders = new Headers();
  myHeaders.append("viewtype", "GET_STATIC_PARAMS");
  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const resData: { data: number; success: boolean } = await res.json();
  const staticData: Array<{ postId: string }> = new Array();
  for (let i = 1; i < resData.data + 1; i++) {
    let target = { postId: i.toString() };
    staticData.push(target);
  }

  return staticData;
}

// async function getMetaData(postId: string) {
//   const myHeaders = new Headers({
//     "Content-Type": "text/html; charset=utf-8",
//   });
//   myHeaders.append("viewType", "GET_META_DATA");
//   myHeaders.append("postid", postId);

//   const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
//     method: "GET",
//     headers: myHeaders,
//     cache: "no-store",
//   });
//   const { data } = await res.json();

//   return {
//     data: data[0],
//   };
// }

// export async function generateMetadata({
//   params,
// }: {
//   params: { postId: string };
// }): Promise<Metadata> {
//   const { postId } = params;
//   const data: any = await getMetaData(postId);

//   return {
//     title: data.title,
//     description: data.description,
//     keywords: data.hashtag,
//     bookmarks: [`https://chocoham.dev/posts/${postId}`],
//     openGraph: {
//       title: data.title,
//       description: data.description,
//       url: `https://chocoham.dev/posts/${postId}`,
//       siteName: "디발자(개자이너) 초코햄의 블로그",
//       images: [{ url: data.thumbnail, width: 380, height: 250 }],
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: data.title,
//       description: data.description,
//       creator: "초코햄",
//       images: [data.thumbnail],
//     },
//   };
// }
