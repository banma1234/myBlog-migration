import { getAllPosts, getSeriesInfo } from "./utils";
import type { Metadata } from "next";
import PostsView from "./components/clientside/postsView";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  }
};

export default async function Admin() {
  const [posts, series] = await Promise.all([getAllPosts(), getSeriesInfo()]);

  return (
    <div>
      <h1>Login bitch</h1>
      <h2>how can i help you?</h2>

      <p>it{"'"}s admin page</p>
      <div>
        {series.map((item: any, i: number) => {
          return (
            <li key={i}>
              {item.series} {"("}
              {item.count}
              {")"}
            </li>
          );
        })}
      </div>
      <PostsView posts={posts} />
    </div>
  );
}
