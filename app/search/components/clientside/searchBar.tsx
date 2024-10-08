"use client";

import { useState, useEffect, useRef, ChangeEvent } from "react";
import iconHandler from "util/iconHandler";
import "../../styles/searchBarStyle.scss";

export default function SearchBar(props: { filter: (input: string) => void }) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [show, setShow] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");
  const inputName = `searchBar__${isClick}`;
  const focusPoint = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isClick) {
      setShow(true);
    } else {
      setTimeout(() => {
        setShow(false);
      }, 380);
    }
  }, [isClick, focusPoint]);

  useEffect(() => {
    show && focusPoint.current && focusPoint.current.focus();
  }, [show, focusPoint]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
    props.filter(e.target.value);
  };

  return (
    <div className="searchBar">
      {show && (
        <input
          id="input__searchBar"
          className={inputName}
          value={inputData}
          placeholder="검색"
          onChange={handleInputChange}
          ref={focusPoint}
        />
      )}
      <div className="searchBar__icon" onClick={() => setIsClick(!isClick)}>
        <div className="searchBar__tooltip">click! </div>
        {iconHandler("search", "28")}
      </div>
    </div>
  );
}
