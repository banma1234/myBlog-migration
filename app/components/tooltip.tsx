import "../styles/tooltipStyle.scss";

export default function Tooltip(props: { children: any; title: string }) {
  return (
    <div className="tooltip">
      {props.children}
      <span className="tooltip__text">{props.title}</span>
    </div>
  );
}
