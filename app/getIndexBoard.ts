export default async function getIndexBoard() {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_INDEX");

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data } = await res.json();
  const head = data[0];

  return { head: head, posts: data.slice(1) };
}