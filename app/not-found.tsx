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
      const res = await getRecommendPost();
      setRecommend(res);
    };

    fetchRecommendData();
  }, []);

  return (
    <section className="error_container">
      <Image
        className="error_image"
        src="/404.svg"
        alt="404 banner"
        width={600}
        height={560}
      />
      <div className="error_nav">
        <Link href="/">
          <button>메인화면 바로가기</button>
        </Link>
        <Link href="/search">
          <button>검색창 바로가기</button>
        </Link>
      </div>
      {recommend.length != 0 && (
        <div>
          <h2>추천 포스트</h2>
          <CardLayout posts={recommend} />
        </div>
      )}
    </section>
  );
}
