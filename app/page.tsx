import { use } from "react";
import { Card, CardLayout } from "./components/card";

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
  const headPost = posts.shift();

  return (
    <div>
      <h1>hello</h1>
      <h2>{headPost.title}</h2>
      <CardLayout posts={posts} />
    </div>
  );
}
