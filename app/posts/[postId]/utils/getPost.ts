import { cache } from "react";

export default cache(async function getPost(postId: string) {
  let URL = process.env.DEV_URL;

  if (typeof URL === undefined) {
    URL = "https://chocoham.dev";
  }

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_POST");
  myHeaders.append("postid", postId);

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const resData = await res.json();

  if (!resData.success) {
    throw new Error(resData.data);
  }

  return {
    post: resData.data[0],
    recent: resData.recent,
    bothSidePosts: resData.bothSidePosts,
  };
});
