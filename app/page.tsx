import { use } from "react";

async function getPost() {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_INDEX");

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
    next: { revalidate: 10 },
  });
  const data = await res.json();

  return data.data;
}

export default function Home() {
  const posts = use(getPost());

  return (
    <div>
      <h1>hello</h1>
      {posts.map((item: any, i: number) => {
        return <p key={i}>{item.title}</p>;
      })}
    </div>
  );
}
