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

async function getComment(postid: string) {
  try {
    const res = await fetch(`/api/comments?postid=${postid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { comment } = await res.json();

    return comment;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

async function addComment(data: {
  comment: UserCommentType;
  commentType: string;
}) {
  const { comment, commentType } = data;

  try {
    const myHeaders = new Headers({ "Content-Type": "application/json" });
    myHeaders.append("commenttype", commentType);

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(comment),
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }

    return;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}

async function deleteComment(target: TargetType) {
  try {
    const res = await fetch(`/api/comments`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(target),
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { message } = await res.json();

    return message;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
