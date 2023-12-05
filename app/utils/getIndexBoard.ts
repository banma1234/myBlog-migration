import { CardType } from "app/components/componentType";
import { headers } from "next/headers";

export default async function getIndexBoard() {
  const URL = process.env.DEV_URL;
  const header = headers();
  console.log(header.get("host"));

  try {
    const res = await fetch(`${URL}/api/dashboard?viewtype=index`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { data }: { data: CardType[] } = await res.json();

    return data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
