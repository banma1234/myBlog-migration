"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { CardType } from "app/components/componentType";
import { CardLayout } from "app/components/card";
import "../../styles/paginationStyle.scss";
import SearchBar from "./searchBar";

export default function SearchBoard(props: { data: Array<CardType> }) {
  const [filteredData, setFilteredData] = useState<Array<CardType>>(props.data);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [max, setMax] = useState<number>(Math.ceil(props.data.length / 9));
  const [slicedData, setSlicedData] = useState<Array<CardType>>([]);
  const [sortOption, setSortOption] = useState<string>("ascend");

  useEffect(() => {
    pagination();
  }, [currentPage]);

  useEffect(() => {
    pagination();
  }, [filteredData]);

  useEffect(() => {
    pagination();
  }, [sortOption]);

  const searchFilter = (input: string) => {
    let target = props.data.filter((item: CardType) =>
      item.title.includes(input)
    );

    setFilteredData(target);
  };

  const sortData = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const pagination = () => {
    sortOption === "ascend"
      ? filteredData.sort((a, b) => b.postId - a.postId)
      : filteredData.sort((a, b) => a.postId - b.postId);

    const start = (currentPage - 1) * 9;
    const end = 9 * currentPage;

    const res = filteredData.slice(start, end);
    setSlicedData(res);
    setMax(Math.ceil(filteredData.length / 9));
  };

  return (
    <article>
      <label className="options">
        <select className="options_sort" onChange={sortData}>
          <option value="ascend">오름차순</option>
          <option value="descend">내림차순</option>
        </select>
        <SearchBar filter={searchFilter} />
      </label>
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
