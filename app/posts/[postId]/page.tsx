import mdParser from "./mdParser";
import getPost from "./getPost";
import CommentBox from "./components/clientside/commentBox";
import commentHandler from "./commentHandler";

export default async function Posts({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { post, recent } = await getPost(postId);
  const comment = await commentHandler(postId, "GET");

  return (
    <article>
      <p>wow</p>
      <h2>{post.title}</h2>
      <div
        dangerouslySetInnerHTML={mdParser(post.content)}
        className="md-viwer"
      />
      <hr />
      {recent &&
        recent.map((item: any, i: number) => {
          return <p key={i}>{item.title}</p>;
        })}
      <CommentBox postId={Number(postId)} comment={comment} />
    </article>
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
