export default async function sitemap() {
  const posts = await getPostData();
  return [
    {
      url: `${process.env.DEV_URL}`,
      author: "Choco ham(banma1234)",
      lastModified: new Date(),
      priority: 1,
    },
    ...posts.map((postId: number) => ({
      url: `${process.env.DEV_URL}/posts/${postId}`,
      author: "Choco ham(banma1234)",
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];
}

async function getPostData() {
  const myHeaders = new Headers();
  myHeaders.append("viewtype", "GET_STATIC_PARAMS");

  const res = await fetch(`${process.env.DEV_URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const resData: { data: number; success: boolean } = await res.json();
  const staticData: Array<number> = new Array(resData.data)
    .fill(1)
    .map((id, i) => {
      return (id += i);
    });

  return staticData;
}
