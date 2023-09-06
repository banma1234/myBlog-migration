"use client";

import { useState } from "react";
import { CardType } from "app/components/componentType";
import { CardLayout } from "app/components/card";
import SearchBar from "./searchBar";

export default function SearchBoard(props: { data: Array<CardType> }) {
  const [filteredData, setFilteredData] = useState<Array<CardType>>([]);
  const posts = props.data;

  const searchFilter = (input: string) => {
    let target = posts.filter((item: CardType) => item.title.includes(input));
    setFilteredData(target);
  };

  return (
    <article>
      <SearchBar filter={searchFilter} />
      <CardLayout posts={filteredData} />
    </article>
  );
}
