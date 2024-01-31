import Link from "next/link";
import iconHandler from "util/iconHandler";
import "../styles/postNavigater.scss";

export default function PostNavigate(props: { both: any }) {
  const { both } = props;

  const routePath = {
    previous: both[0] ? `/posts/${both[0].postId}` : "",
    next: both[1] ? `/posts/${both[1].postId}` : "",
  };

  return (
    <>
      {both[0] && (
        <Link href={routePath.previous}>
          <div className="navigate__left">
            {iconHandler("arrowLeft", "2rem", "#77a6f7")}
            <ul>
              <li className="small">
                <span>Previous</span>
              </li>
              <li>{both[0].title}</li>
            </ul>
          </div>
        </Link>
      )}
      {both[1] && (
        <Link href={routePath.next}>
          <div className="navigate__right">
            <ul>
              <li className="small">Next</li>
              <li>{both[1].title}</li>
            </ul>
            {iconHandler("arrowRight", "2rem", "#77a6f7")}
          </div>
        </Link>
      )}
    </>
  );
}
