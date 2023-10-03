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

  return { posts: data };
}

// async function getSeries() {
//   const myHeaders = new Headers({
//     "Content-Type": "text/html; charset=utf-8",
//   });
//   myHeaders.append("viewType", "VIEW_SERIES");

//   const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
//     method: "GET",
//     headers: myHeaders,
//   });
//   const { data } = await res.json();

//   return { sereis: data };
// }
