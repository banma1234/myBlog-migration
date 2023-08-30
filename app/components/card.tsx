import Image from "next/image";
import "../styles/cardStyle.scss";

export function CardLayout(props: any) {
  const posts = props.posts;
  return (
    <div className="card_layout">
      {posts &&
        posts.map((item: any, i: number) => {
          return (
            <div className="card">
              {/* <div className="card_thumbnail">
                <Image
                  src={item.thumbnail}
                  alt="card Img"
                  width={380}
                  height={250}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              </div> */}
              <h3>{item.title}</h3>
              <p>{item.uploadDate}</p>
            </div>
          );
        })}
    </div>
  );
}

export function Card(post: any) {
  return (
    <div className="card_head">
      <h1>damn</h1>
    </div>
  );
}
