"use client";

import "../../styles/commentStyle/commentMenuStyle.scss";
import { useSession } from "next-auth/react";
import { useState, useEffect, ChangeEvent } from "react";
import { DropdownType, TargetType } from "../componentType";
import { commentHandler } from "../../utils";

export default function CommentMenu(props: DropdownType) {
  const { data: session } = useSession();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (error) alert(error);
  }, [error]);

  const initData = async () => {
    const newComment = await commentHandler(props.postId.toString(), "GET");
    props.setComments(newComment);

    setPassword("");
  };

  const deleteComment = async (e: any) => {
    e.preventDefault();
    if (!password) {
      setError("please write your password");
      return;
    }

    if (props.isAdmin && !(session && session.user)) {
      setError("관리자 댓글입니다. 로그인 후 이용해주세요.");
      return;
    }

    const target: TargetType = { password: password, ...props.data };
    await commentHandler(target, "DELETE");

    initData();
  };

  return (
    <div className="dropdown">
      <input
        className="dropdown__input__small"
        value={password}
        type="password"
        placeholder="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <button className="dropdown__button" onClick={deleteComment}>
        Submit
      </button>
    </div>
  );
}
