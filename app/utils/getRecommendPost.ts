import { CardType } from "app/components/componentType";

export default async function getRecommendPost() {
  const URL = process.env.DEV_URL;

  const res = await fetch(`${URL}/api/posts/recommend`, {
    method: "GET",
  });

  const { data, success }: { data: CardType[] | string; success: boolean } =
    await res.json();

  if (!success || typeof data === "string") {
    throw new Error(data as string);
  }

  return data;
}
