import Link from "next/link";
import iconHandler from "util/iconHandler";
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
          <div className="navigate_left">
            {iconHandler("arrowLeft", "2rem", "#77a6f7")}
            <ul>
              <li className="small">
                <span>Previous</span>
              </li>
              <li>텍스트가 너무 길어서 말줄임이 필요한데 이거 어떻해야하나</li>
            </ul>
          </div>
        </Link>
      )}
      <Link href={routeTarget.next}>
        <div className="navigate_right">
          <ul>
            <li className="small">Next</li>
            <li>텍스트가 너무 길어서 말줄임 이 필요한데 이거 어떻해야하나</li>
          </ul>
          {iconHandler("arrowRight", "2rem", "#77a6f7")}
        </div>
      </Link>
    </>
  );
}
