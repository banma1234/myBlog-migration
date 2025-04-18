import { CardType } from "app/components/componentType";

export default async function getRecommendPost() {
  const URL = process.env.DEV_URL as string;

  try {
    const res = await fetch(`${URL}/api/dashboard?viewtype=recommend`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
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
