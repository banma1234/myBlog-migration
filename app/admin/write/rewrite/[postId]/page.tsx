import { getPost } from "../../../utils";
import { redirect } from "next/navigation";
import WriteBoard from "../../../components/clientside/writeBoard";

export default async function Rewrite(
  props: {
    params: Promise<{ postId: string }>;
  }
) {
  const params = await props.params;
  const { postId } = params;
  const resData = await getPost(postId).then((res) => {
    if (!res) {
      console.log("404 : post not found");
      alert("404 : post not found");
      redirect("/admin");
    }
    return res;
  });

  const { post } = resData;

  return <WriteBoard postData={post} type="REWRITE" />;
}
