import { getAllPosts, getSeriesInfo } from "./utils";
import PostsView from "./components/clientside/postsView";

export default async function Admin() {
  const postData = getAllPosts();
  const seriesData = getSeriesInfo();
  // const [posts, series] = await Promise.all([postData, seriesData]);

  /*
   * data만 server component에서 받고 뷰는 client-side로 할거임
   */
  return (
    <div>
      <h1>Login bitch</h1>
      <h2>how can i help you?</h2>

      <p>it{"'"}s admin page</p>
      {/* <div>
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
      <PostsView posts={posts} /> */}
    </div>
  );
}
