import { getPost } from "../../../utils";
import WriteBoard from "../../writeBoard";

export default async function Rewrite({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const { post } = await getPost(postId);

  return <WriteBoard postData={post} />;
}
