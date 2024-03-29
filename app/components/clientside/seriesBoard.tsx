"use client";

import { useState, useEffect } from "react";
import iconHandler from "util/iconHandler";
import Link from "next/link";
import "../../styles/seriesBoardStyle.scss";

export default function SeriesBoard(props: {
  data: Array<any>;
  postId: number;
}) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const TITLE = `📋 [ ${props.data[0].series} ] 시리즈 몰아보기 (${props.data.length})`;

  useEffect(() => {
    if (isClick) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 380);
    }
  }, [isClick]);

  return (
    <>
      <div className="seriesBoard">
        <div
          className="seriesBoard__dropDown"
          onClick={() => setIsClick(!isClick)}
        >
          <h2>{TITLE}</h2>
          {iconHandler(isClick ? "arrowUp" : "arrowDown", "32")}{" "}
        </div>

        {show && (
          <SeriesOnPage
            data={props.data}
            postId={props.postId}
            isClick={isClick}
          />
        )}
      </div>
    </>
  );
}

const SeriesOnPage = (props: {
  data: Array<any>;
  postId: number;
  isClick: boolean;
}) => {
  const dropDownName = `container__${props.isClick}`;

  return (
    <div className={dropDownName}>
      <ul className="container__ul">
        {props.data.map((item: any, i: number) => {
          const url = `/posts/${item.postId}`;
          const postName = props.postId === item.postId ? "current" : "others";

          return (
            <Link href={url} key={i}>
              <li className={postName}>{item.title}</li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};
