"use client";

import "../../styles/commentStyle/commentMenuStyle.scss";
import { useState, ChangeEvent } from "react";
import { DropdownType, TargetType } from "../componentType";
import { commentHandler } from "../../utils";

export default function CommentMenu(props: DropdownType) {
  const [password, setPassword] = useState<string>("");

  const initData = async () => {
    const newComment = await commentHandler(props.postId.toString(), "GET");
    props.setComments(newComment);

    setPassword("");
  };

  const deleteComment = async (e: any) => {
    e.preventDefault();
    if (!password) {
      alert("please write your password");
      return;
    }

    const target: TargetType = { password: password, ...props.data };
    await commentHandler(target, "DELETE");

    initData();
  };

  return (
    <div className="dropdown">
      <input
        className="dropdown_input_small"
        value={password}
        type="password"
        placeholder="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button className="dropdown_button" onClick={deleteComment}>
        Submit
      </button>
    </div>
  );
}
