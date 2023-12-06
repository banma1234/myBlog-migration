import Image from "next/image";
import Link from "next/link";
import iconHandler from "util/iconHandler";
import HashTag from "app/posts/[postId]/components/hashTag";
import { Black_Han_Sans } from "next/font/google";
import { CardType } from "./componentType";
import "../styles/cardStyle.scss";

const MY_TAG = [
  "React",
  "next.js",
  "python",
  "node.js",
  "mySQL",
  "mongoDB",
  "illust",
  "design",
].join(" ");

const MY_INTRO =
  "프론트앤드 디발자, 웹 개자이너 초코햄입니다. javascript 기반의 프론트앤드 개발을 주력으로 하고 있으며 일러스트 및 웹디자인 또한 다룹니다.";

const myFont = Black_Han_Sans({
  weight: ["400"],
  subsets: ["latin"],
});

export function CardLayout(props: { posts: Array<CardType> }) {
  const posts = props.posts;

  return (
    <div className="card_layout">
      {posts &&
        posts.map((item: CardType, i: number) => {
          const url = `/posts/${item.postId}`;
          const imgUrl = item.thumbnail as string;

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
                  <p>{item.description}</p>
                </div>
                <p className="card_date">
                  {iconHandler("calendar", "12")} &nbsp; {item.uploadDate}
                </p>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export function Banner() {
  return (
    <>
      <div className="banner">
        <div className="banner_thumbnail">
          <Image
            src="https://choco-image-server.cdn.ntruss.com/images/banner.png"
            alt="Banner Img"
            layout="fill"
          />
        </div>
        <div className="banner_info">
          <h1 className={myFont.className}>ChocoHam 개발 블로그</h1>
          <p>{MY_INTRO}</p>
        </div>
        <HashTag hashTag={MY_TAG} />
      </div>
    </>
  );
}
