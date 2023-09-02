import Link from "next/link";
import "../styles/postNavigater.scss";

export default function PostNavigate(props: { postId: number; max: any }) {
  const { postId, max } = props;
  const routeTarget = {
    previous: `/posts/${postId - 1}`,
    next: `/posts/${postId + 1}`,
  };

  return (
    <>
      {postId != 1 && (
        <Link href={routeTarget.previous}>
          <div className="navigate_button">
            <p>{"<"}</p>
            <p>previous</p>
          </div>
        </Link>
      )}
      <Link href={routeTarget.next}>
        <div className="navigate_button">
          <p>next</p>
          <p>{">"}</p>
        </div>
      </Link>
    </>
  );
}
