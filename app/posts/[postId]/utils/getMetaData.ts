export default async function getMetaData(postId: string) {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "GET_META_DATA");
  myHeaders.append("postid", postId);

  const res = await fetch("https://chocoham.dev/api/posts", {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  });
  const { data } = await res.json();

  return {
    data: data[0],
  };
}
