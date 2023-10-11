import { UserCommentType, TargetType } from "../components/componentType";

export default function commentHandler(data: any, type: string) {
  switch (type) {
    case "GET":
      return getComment(data);
    case "POST":
      return addComment(data);
    case "DELETE":
      return deleteComment(data);
  }
}

const URL = process.env.DEV_URL || "";

async function getComment(postId: string) {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("postid", postId);
  const res = await fetch(`${URL}/api/comments`, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  });
  const comments = await res.json();

  return comments.success && comments["message"].length
    ? comments["message"]
    : undefined;
}

async function addComment(data: {
  comment: UserCommentType;
  commentType: string;
}) {
  const { comment, commentType } = data;

  const myHeaders = new Headers({});
  myHeaders.append("commenttype", commentType);

  const res = await fetch("/api/comments", {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(comment),
  });
  const resData = await res.json();

  return resData;
}

async function deleteComment(target: TargetType) {
  const res = await fetch("/api/comments", {
    method: "DELETE",
    body: JSON.stringify(target),
  });
  const resData = await res.json();

  return resData;
}
