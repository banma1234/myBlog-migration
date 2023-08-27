export default async function getComment(postId: string) {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("postid", postId);
  const res = await fetch(`${process.env.DEV_URL}/api/comments`, {
    method: "GET",
    headers: myHeaders,
  });
  const comments = await res.json();

  return comments["message"];
}
