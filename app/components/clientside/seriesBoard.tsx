"use client";

import { useState } from "react";
import Link from "next/link";

export default function SeriesBoard(props: { data: Array<any> }) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const data = props.data;

  return (
    <>
      <div onClick={() => setIsClick(!isClick)}>
        <h2>시리즈별로 모아보기</h2>
      </div>
      {isClick && (
        <ul>
          {data.map((item: any, i: number) => {
            const url = `/posts/${item.postId}`;
            return (
              <Link href={url}>
                <li key={i}>{item.title}</li>
              </Link>
            );
          })}
        </ul>
      )}
    </>
  );
}
