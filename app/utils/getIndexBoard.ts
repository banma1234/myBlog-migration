import { CardType } from "app/components/componentType";

export default async function getIndexBoard() {
  const URL = process.env.DEV_URL;

  const myHeaders = new Headers({
    "Content-Type": "text/html; charset=utf-8",
  });
  myHeaders.append("viewType", "VIEW_INDEX");

  const res = await fetch(`${URL}/api/posts`, {
    method: "GET",
    headers: myHeaders,
    next: { revalidate: 3600 },
  });
  const { data, success }: { data: CardType[]; success: boolean } =
    await res.json();

  if (!success) {
    throw new Error(data.toString());
  }

  return data;
}
