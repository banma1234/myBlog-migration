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
  const { data, recent, bothSidePosts } = await res.json();

  return {
    post: data[0],
    recent: recent,
    bothSidePosts: bothSidePosts,
  };
}
