import { CardHead, CardLayout } from "./components/card";
import ToastMessage from "./components/clientside/toastMessage";
import getIndexBoard from "./getIndexBoard";

export default async function Home() {
  const { head, posts } = await getIndexBoard();
  const message = `💡 로그인 하지 않아도 댓글을 등록할 수 있습니다!`;

  return (
    <section>
      <h1>Chocoham{"'"}s blog</h1>
      <CardHead post={head} />
      <CardLayout posts={posts} />
      <ToastMessage children={message} />
    </section>
  );
}
