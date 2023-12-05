import { cache } from "react";

export default cache(async function getPost(postId: string) {
  const URL = process.env.DEV_URL;
  const postid = postId;

  try {
    const res = await fetch(`${URL}/api/posts/${postid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { post, recent, bothSidePosts } = await res.json();

    return {
      post: post,
      recent: recent,
      bothSidePosts: bothSidePosts,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
});
