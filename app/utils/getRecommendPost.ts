import { CardType } from "app/components/componentType";

export default async function getRecommendPost() {
  const URL = process.env.DEV_URL;

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_RECOMMENDED_POST");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
  });
  const { data, success }: { data: CardType[] | string; success: boolean } =
    await res.json();

  if (!success || typeof data === "string") {
    throw new Error(data as string);
  }

  return data;
}
