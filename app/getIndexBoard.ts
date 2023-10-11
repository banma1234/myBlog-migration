export default async function getIndexBoard() {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_INDEX");

  const res = await fetch("https://chocoham.dev/api/posts", {
    method: "GET",
    headers: myHeaders,
  });
  const { data } = await res.json();

  return { posts: data };
}
