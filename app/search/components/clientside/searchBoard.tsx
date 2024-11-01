"use client";

import { useState, useEffect } from "react";
import { CardType } from "app/components/componentType";
import { CardLayout } from "app/components/card";
import "../../styles/paginationStyle.scss";
import iconHandler from "util/iconHandler";
import SearchBar from "./searchBar";

export default function SearchBoard(props: { data: Array<CardType> }) {
  const data = props.data || [];
  const [prevData, setPrevData] = useState<Array<CardType>>(data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [max, setMax] = useState<number>(Math.ceil(data.length / 9));
  const [currentData, setCurrentData] = useState<Array<CardType>>([]);
  const [sortOption, setSortOption] = useState<boolean>(true);

  useEffect(() => {
    const start = (currentPage - 1) * 9;
    const end = 9 * currentPage;

    sortOption
      ? prevData.sort((a, b) => b.postId - a.postId)
      : prevData.sort((a, b) => a.postId - b.postId);

    setCurrentData(prevData.slice(start, end));
    setMax(Math.ceil(prevData.length / 9));
  }, [currentPage, prevData, sortOption]);

  const searchEngine = (input: string) => {
    let target = data.filter((item: CardType) => item.title.includes(input));

    if (target.length) {
      setPrevData(target);
    }
  };

  const currentPageHandler = (i: number) => {
    if (i === 0 || i === max + 1) return;
    setCurrentPage(i);
  };

  const sortData = () => {
    setSortOption(!sortOption);
  };

  return (
    <article>
      <label className="options">
        <div className="options__button" onClick={sortData}>
          {sortOption
            ? iconHandler("arrowUp", "20")
            : iconHandler("arrowDown", "20")}
        </div>
        <SearchBar filter={searchEngine} />
      </label>
      <CardLayout posts={currentData} fadeIn={false} />

      <div className="container">
        <div className="pagination">
          <li
            onClick={() => {
              currentPageHandler(currentPage - 1);
            }}
          >
            {"<"}
          </li>
          {new Array(max).fill(0).map((item: number, i: number) => {
            const targetName =
              i + 1 === currentPage ? "pagination__target" : "";
            return (
              <div key={i} className={targetName}>
                <li onClick={() => currentPageHandler(i + 1)}>{i + 1}</li>
              </div>
            );
          })}
          <li
            onClick={() => {
              currentPageHandler(currentPage + 1);
            }}
          >
            {">"}
          </li>
        </div>
      </div>
    </article>
  );
}
