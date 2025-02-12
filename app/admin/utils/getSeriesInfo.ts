export default async function getSeriesInfo() {
  const URL = process.env.DEV_URL;

  try {
    const res = await fetch(`${URL}/api/dashboard?viewtype=series`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const failed = await res.json();
      throw new Error(failed.error as string);
    }
    const { series } = await res.json();

    return series;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(e.message);
    } else {
      throw new Error("Unknown error");
    }
  }
}
