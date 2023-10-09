export default async function sitemap() {
  const { staticData, date } = await getPostData();
  return [
    {
      url: `${process.env.DEV_URL}`,
      author: "ChocoHam(@banma1234)",
      lastModified: new Date(),
      priority: 1,
    },
    ...staticData.map((postId: number, i: number) => ({
      url: `${process.env.DEV_URL}/posts/${postId}`,
      author: "ChocoHam(@banma1234)",
      lastModified: date[i],
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
  const { data, date } = await res.json();
  const staticData: Array<number> = new Array(data).fill(1).map((id, i) => {
    return (id += i);
  });

  return {
    staticData: staticData,
    date: date,
  };
}
