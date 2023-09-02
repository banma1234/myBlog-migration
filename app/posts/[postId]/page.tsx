import mdParser from "./mdParser";
import getPost from "./getPost";
import CommentBox from "./components/clientside/commentBox";
import commentHandler from "./commentHandler";
import PostNavigate from "./components/postNavigate";
import styles from "./styles/page.module.scss";

export default async function Posts({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { post, recent, max } = await getPost(postId);
  const comment = await commentHandler(postId, "GET");

  return (
    <>
      <header>
        <h1>{post.title}</h1>
      </header>
      <div
        className={styles.post}
        dangerouslySetInnerHTML={mdParser(post.content)}
      />
      <nav className={styles.navigate}>
        <PostNavigate postId={Number(postId)} max={max} />
      </nav>
      <article className={styles.comment}>
        <CommentBox postId={Number(postId)} comment={comment} />
      </article>
      <section className={styles.recent}>
        {recent &&
          recent.map((item: any, i: number) => {
            return <p key={i}>{item.title}</p>;
          })}
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
  const postsArray = await res.json();

  return postsArray.success
    ? postsArray.data.map((item: any) => ({
        postId: item.postId.toString(),
      }))
    : undefined;
}
