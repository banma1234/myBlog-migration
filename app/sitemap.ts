import { headers } from "next/headers";

export default async function sitemap() {
  const URL = process.env.DEV_URL as string;
  const header = await headers();
  console.log(header.get("host"));

  const { staticData, date } = await getPostData(URL);
  return [
    {
      url: `${URL}`,
      author: "ChocoHam(@banma1234)",
      lastModified: new Date(),
      priority: 1,
    },
    ...staticData.map((postId: number, i: number) => ({
      url: `${URL}/posts/${postId}`,
      author: "ChocoHam(@banma1234)",
      lastModified: new Date(date[i].uploadDate),
      priority: 0.8,
    })),
  ];
}

async function getPostData(URL: string) {
  try {
    const res = await fetch(`${URL}/api/seo/static-params`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { count, date } = await res.json();

    const staticData: Array<number> = new Array(count).fill(1).map((id, i) => {
      return (id += i);
    });

    return {
      staticData: staticData,
      date: date,
    };
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
