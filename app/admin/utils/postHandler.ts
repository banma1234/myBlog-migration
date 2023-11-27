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

  const res = await fetch("/api/posts", {
    method: type === "POST" ? "POST" : "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });

  return await res.json();
}

async function deletePosts(data: any) {
  const { target } = data;

  const res = await fetch("/api/posts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(target),
  });

  return await res.json();
}
