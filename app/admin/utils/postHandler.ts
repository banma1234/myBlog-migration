export default function postHandler(
  data: any,
  type: "POST" | "PUT" | "DELETE"
) {
  switch (type) {
    case "DELETE":
      return deletePosts(data);
    default:
      return writePost(data, type);
  }
}

async function writePost(data: any, type: "POST" | "PUT") {
  const post = data;

  try {
    const res = await fetch("/api/admin/post", {
      method: type,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
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

async function deletePosts(data: any) {
  const { target } = data;

  try {
    const res = await fetch("/api/posts", {
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
