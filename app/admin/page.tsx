import { getAllPosts, getSeriesInfo } from "./utils";
import styles from "./styles/page.module.scss";

export default async function Admin() {
  const postData = getAllPosts();
  const seriesData = getSeriesInfo();
  const [posts, series] = await Promise.all([postData, seriesData]);

  /*
   * data만 server component에서 받고 뷰는 client-side로 할거임
   */
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
      <div>
        <button>선택삭제</button>
      </div>
      <table className={styles.table}>
        <tr>
          <th>
            <input type="checkbox" />
          </th>
          <th>id</th>
          <th>시리즈</th>
          <th>제목</th>
          <th>댓글</th>
          <th>작성일자</th>
        </tr>
        {posts.map((post: any, i: number) => {
          return (
            <tr key={i}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{post.postId}</td>
              <td>{post.series}</td>
              <td>{post.title}</td>
              <td>
                {"("}temp{")"}
              </td>
              <td>{post.uploadDate}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}
