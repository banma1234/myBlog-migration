export default function commentHandler(
  postId: string,
  type: string,
  data?: any,
) {
  switch (type) {
    case "GET":
      return getComment(postId);
    case "DELETE":
      return deleteComment(data);
  }
}

async function getComment(postId: string) {
  const ENV_URL = process.env.DEV_URL;
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("postid", postId);
  const res = await fetch(`${ENV_URL ? ENV_URL : ""}/api/comments`, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  });
  const comments = await res.json();

  return comments.success && comments["message"].length
    ? comments["message"]
    : undefined;
}

async function deleteComment(data: any) {
  const res = await fetch("/api/comments", {
    method: "DELETE",
    body: JSON.stringify(data),
  });
  const resData = await res.json();

  return resData;
}
