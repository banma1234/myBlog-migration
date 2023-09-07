"use client";

import { useState, useEffect } from "react";
import { CardType } from "app/components/componentType";
import { CardLayout } from "app/components/card";
import "../../styles/paginationStyle.scss";
import SearchBar from "./searchBar";

export default function SearchBoard(props: { data: Array<CardType> }) {
  const [filteredData, setFilteredData] = useState<Array<CardType>>(props.data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [max, setMax] = useState<number>(Math.ceil(props.data.length / 9));
  const [slicedData, setSlicedData] = useState<Array<CardType>>([]);

  useEffect(() => {
    pagination();
  }, [currentPage]);

  useEffect(() => {
    pagination();
  }, [filteredData]);

  const searchFilter = (input: string) => {
    let target = props.data.filter((item: CardType) =>
      item.title.includes(input),
    );

    setFilteredData(target);
  };

  const pagination = () => {
    const start = (currentPage - 1) * 9;
    const end = 9 * currentPage;

    const res = filteredData.slice(start, end);
    setSlicedData(res);
    setMax(Math.ceil(filteredData.length / 9));
  };

  return (
    <article>
      <SearchBar filter={searchFilter} />
      <CardLayout posts={slicedData} />
      <div className="pagination">
        <li className="pagination_target">{"<"}</li>
        {new Array(max).fill(0).map((item: number, i: number) => {
          return (
            <li
              className="pagination_target"
              key={i}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </li>
          );
        })}
        <li className="pagination_target">{">"}</li>
      </div>
    </article>
  );
}
