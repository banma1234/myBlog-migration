import CommentBox from "./components/clientside/commentBox";
import PostNavigate from "./components/postNavigate";
import HashTag from "./components/hashTag";
import styles from "./styles/page.module.scss";
import { getPost, mdParser } from "./utils";
import { CardLayout } from "app/components/card";

const message = `💡 로그인 하지 않아도 댓글을 등록할 수 있습니다!`;

export default async function Posts({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { post, recent, bothSidePosts } = await getPost(postId);

  return (
    <>
      <header>
        <h1 className={styles.title}>{post.title}</h1>
      </header>
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
        <h2>👁️‍🗨️ recent posts</h2>
        <CardLayout posts={recent} />
      </section>
    </>
  );
}

export async function generateStaticParams() {
  const myHeaders = new Headers();
  myHeaders.append("viewtype", "GET_STATIC_PARAMS");

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const resData: { data: number; success: boolean } = await res.json();
  const staticData: Array<{ postId: string }> = new Array();

  for (let i = 0; i < resData.data; i++) {
    let target = { postId: i.toString() };
    staticData.push(target);
  }

  return staticData;
}
