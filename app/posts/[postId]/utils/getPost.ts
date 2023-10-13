export default async function getPost(postId: string) {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_POST");
  myHeaders.append("postid", postId);

  const res = await fetch("https://chocoham.dev/api/posts", {
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
}
