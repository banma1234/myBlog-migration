import "../styles/hashTagStyle.scss";

export default function HashTag(props: { hashTag: string }) {
  const hashTag = props.hashTag.split(" ");
  return (
    <div className="hashTag">
      {hashTag &&
        hashTag.map((item: string, i: number) => {
          return (
            <div className="hashTag_box" key={i}>
              {`# ${item}`}
            </div>
          );
        })}
    </div>
  );
}
