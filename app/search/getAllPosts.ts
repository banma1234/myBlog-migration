export default async function getAllPosts() {
  const URL = process.env.DEV_URL;

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_ALL");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data, success } = await res.json();

  if (!success) {
    throw new Error(data);
  }

  return data;
}
