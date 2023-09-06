"use client";

import { useState, ChangeEvent, Dispatch, SetStateAction } from "react";
import iconHandler from "util/iconHandler";

export default function SearchBar(props: {
  filter: Dispatch<SetStateAction<string>>;
}) {
  const [isClick, setIsClick] = useState<boolean>(false);
  const [inputData, setInputData] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputData(e.target.value);
    props.filter(inputData);
  };

  return (
    <div className="searchBar">
      {/* 영역 외 클릭시 isClick = false로 할거임 */}
      <div onClick={() => setIsClick(true)}>{iconHandler("search", "18")}</div>
      {isClick && (
        <input
          className="input_small"
          value={inputData}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
}
