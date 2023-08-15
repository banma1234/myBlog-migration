import { MDXRemote } from "next-mdx-remote/rsc";
import { useMDXComponents } from "./mdxComponent";

async function getPost(postId: string) {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_POST");
  myHeaders.append("postid", postId);

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
    cache: "force-cache",
  });
  const post = await res.json();

  return {
    post: post["data"][0],
    recent: post["recent"],
  };
}

export default async function Posts({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { post, recent } = await getPost(postId);

  return (
    <article>
      <p>wow</p>
      <h2>{post.title}</h2>
      <MDXRemote source={post.content} components={useMDXComponents} />
      <hr />
      {recent &&
        recent.map((item: any) => {
          return <p>{item.title}</p>;
        })}
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
