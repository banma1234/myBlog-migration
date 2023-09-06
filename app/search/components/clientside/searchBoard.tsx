"use client";

import { useState, useEffect } from "react";
import { CardType } from "app/components/componentType";
import { CardLayout } from "app/components/card";
import SearchBar from "./searchBar";

export default function SearchBoard(props: { data: CardType }) {
  const [filteredData, setFilteredData] = useState<Array<CardType>>([]);

  return (
    <>
      <h1>hello</h1>
      <CardLayout posts={filteredData} />
    </>
  );
}
