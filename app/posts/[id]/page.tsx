async function getPost(postId: string) {
  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_POST");
  myHeaders.append("postid", postId);

  console.log("postId : ", postId);

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
    cache: "force-cache",
  });
  const post = await res.json();

  return {
    post: post["data"],
    recent: post["recent"],
  };
}

export default async function Posts({
  params: { postId },
}: {
  params: { postId: string };
}) {
  const { post, recent } = await getPost(postId);

  return (
    <article>
      <p>wow</p>
      <h1>haha</h1>
      <p>{postId}</p>
      <p>{JSON.stringify(post)}</p>
    </article>
  );
}

export async function generateStaticParams() {
  const myHeaders = new Headers();
  myHeaders.append("viewtype", "GET_STATIC_PARAMS");

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const postsArray = await res.json();

  // postsArray = [{postId: 1}, {postId: 2}, ... ]
  return postsArray.data.map((item: any) => ({
    postId: item.postId.toString(),
  }));
}
