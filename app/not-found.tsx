"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { getRecommendPost } from "./utils";
import { CardLayout } from "./components/card";
import { CardType } from "./components/componentType";
import "./styles/errorStyle.scss";

export default function NotFound() {
  const [recommend, setRecommend] = useState<CardType[]>(new Array<CardType>());

  useEffect(() => {
    const fetchRecommendData = async () => {
      await getRecommendPost().then((res) => {
        setRecommend(res);
      });
    };

    fetchRecommendData();
  }, []);

  return (
    <section className="error__container">
      <Image
        className="error__image"
        src="/404.svg"
        alt="404 banner"
        width={600}
        height={560}
        style={{
          maxWidth: "100%",
          minWidth: "28rem",
          height: "auto",
        }}
      />
      <div className="error__nav">
        <Link href="/">
          <button>메인화면 바로가기</button>
        </Link>
        <Link href="/search">
          <button>검색창 바로가기</button>
        </Link>
      </div>
      <div>
        <h2>추천 포스트</h2>
        {!recommend.length ? (
          <LoadingUi />
        ) : (
          <CardLayout posts={recommend} fadeIn={true} />
        )}
      </div>
    </section>
  );
}

export function LoadingUi() {
  return (
    <div className="loading">
      {new Array(3).fill(true).map((item: boolean, i: number) => {
        return (
          <div className="loading__image" key={i}>
            <Image
              src="/loading.svg"
              alt="loading"
              width={100}
              height={100}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            ;
          </div>
        );
      })}
    </div>
  );
}
