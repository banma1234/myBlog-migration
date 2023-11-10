import { getPost } from "../../../utils";
import WriteBoard from "../../../components/clientside/writeBoard";

export default async function Rewrite({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const { post } = await getPost(postId);

  return <WriteBoard postData={post} type="REWRITE" />;
}
