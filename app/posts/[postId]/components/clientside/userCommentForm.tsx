"use client";

import { ChangeEvent, useState } from "react";
import parseDate from "util/parseDate";
import {
  UserCommentFormType,
  UserCommentType,
  TreeHandlerType,
} from "../componentType";

const treeHandler: TreeHandlerType = {
  REF(data, type) {
    if (data) {
      switch (type) {
        case "DEFAULT":
          // 이거 맨 마지막꺼 잘라오는걸로 고쳐야함
          return data.REF + 1;
        case "REPLY":
          return data.REF;
      }
    } else {
      return 1;
    }
  },

  RE_STEP(data, type) {
    if (data) {
      switch (type) {
        case "DEFAULT":
          return 0;
        case "REPLY":
          return data.RE_STEP + 1;
      }
    } else {
      return 0;
    }
  },

  RE_LEVEL(data, type) {
    if (data) {
      switch (type) {
        case "DEFAULT":
          return 0;
        case "REPLY":
          return data.RE_LEVEL + 1;
      }
    } else {
      return 0;
    }
  },
};

export default function UserCommentForm(props: UserCommentFormType) {
  const [userComment, setUserComment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const initData = () => {
    setUserComment("");
    setPassword("");
    setUserName("");
    alert("success");
  };

  const submitComment = async (e: any) => {
    e.preventDefault();
    if (!userComment) alert("댓글을 입력해주세요");

    const myHeaders = new Headers({});
    myHeaders.append("commenttype", props.type);

    const comment: UserCommentType = {
      REF: treeHandler.REF(props.data, props.type),
      RE_STEP: treeHandler.RE_STEP(props.data, props.type),
      RE_LEVEL: treeHandler.RE_LEVEL(props.data, props.type),
      postId: props.postId,
      date: parseDate(new Date()),
      writter: userName,
      password: password,
      content: userComment,
    };

    const res = await fetch("/api/comments", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(comment),
    });
    const resData = await res.json();

    resData.success ? initData() : alert(resData.message);
  };

  return (
    <>
      <input
        value={userName}
        placeholder="닉네임"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUserName(e.target.value)
        }
      />
      <input
        value={password}
        placeholder="비밀번호"
        type="password"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
      />
      <textarea
        value={userComment}
        placeholder="댓글 입력"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setUserComment(e.target.value)
        }
      />
      <button onClick={submitComment}>확인</button>
    </>
  );
}
