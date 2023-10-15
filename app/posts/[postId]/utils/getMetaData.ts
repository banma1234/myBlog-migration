import { cache } from "react";

export default cache(async function getMetaData(postId: string) {
  const { data } = await metaData();
  return data.find((item: any) => item.postId === postId);
});

async function metaData() {
  let URL = process.env.DEV_URL;

  const res = await fetch(`${URL}/api/metadata`, {
    method: "GET",
  });
  const { data, success } = await res.json();

  if (!success) {
    throw new Error(data);
  }

  return data;
}
