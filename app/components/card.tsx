import Image from "next/image";
import Link from "next/link";
import iconHandler from "util/iconHandler";
import { CardType } from "./componentType";
import "../styles/cardStyle.scss";

export function CardLayout(props: { posts: Array<CardType> }) {
  const posts = props.posts;

  return (
    <div className="card_layout">
      {posts &&
        posts.map((item: CardType, i: number) => {
          const url = `/posts/${item.postId}`;
          const imgUrl = item.thumbnail || "/profile.jpg";

          return (
            <Link href={url} key={i}>
              <div className="card">
                <div className="card_thumbnail">
                  <Image
                    src={imgUrl}
                    alt="card Img"
                    width={380}
                    height={250}
                    style={{
                      maxWidth: "100%",
                      height: "10rem",
                    }}
                  />
                </div>
                <div className="card_info">
                  <h3 className="card_title">{item.title}</h3>
                  <p className="card_date">
                    {iconHandler("calendar", "12")} &nbsp; {item.uploadDate}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export function CardHead(props: any) {
  const post = props.post;
  const url = `/posts/${post.postId}`;

  return (
    <Link href={url}>
      <div className="card_head">
        <div className="card_thumbnail">
          <Image
            src={post.thumbnail}
            alt="card Img"
            width={1200}
            height={789}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </div>
        <div className="card_head_info">
          <h1 className="card_head_title">{post.title}</h1>
          <p>{post.uploadDate}</p>
        </div>
      </div>
    </Link>
  );
}
