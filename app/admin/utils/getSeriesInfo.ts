export default async function getSeriesInfo() {
  const URL = process.env.DEV_URL;

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_SERIES");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
    cache: "no-store",
  });
  const { data } = await res.json();

  return data;
}
