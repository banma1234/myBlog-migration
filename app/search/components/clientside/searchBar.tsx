"use client";

import { useState, useEffect, ChangeEvent } from "react";
import iconHandler from "util/iconHandler";
import "../../styles/searchBarStyle.scss";

export default function SearchBar(props: { filter: (input: string) => void }) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");
  const inputName = `searchBar_${show}`;

  useEffect(() => {
    if (isClick) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 400);
    }
  }, [isClick]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
    props.filter(e.target.value);
  };

  return (
    <div className="searchBar">
      <input
        className={inputName}
        value={inputData}
        placeholder="검색"
        onChange={handleInputChange}
      />
      <div className="searchBar_icon" onClick={() => setIsClick(!isClick)}>
        {iconHandler("search", "28")}
      </div>
    </div>
  );
}
