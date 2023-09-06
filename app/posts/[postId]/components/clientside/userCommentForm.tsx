"use client";

import parseDate from "util/parseDate";
import "../../styles/commentStyle/userCommentStyle.scss";
import ToastMessage from "app/components/clientside/toastMessage";
import { ChangeEvent, useState } from "react";
import { commentHandler } from "../../utils";
import {
  UserCommentFormType,
  UserCommentType,
  TreeHandlerType,
} from "../componentType";

const message = `💡 로그인 하지 않아도 댓글을 등록할 수 있습니다!`;

const treeHandler: TreeHandlerType = {
  REF(data, type) {
    if (data) {
      switch (type) {
        case "DEFAULT":
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

  const initData = async () => {
    const newComment = await commentHandler(props.postId.toString(), "GET");
    props.setComments(newComment);

    setUserComment("");
    setPassword("");
    setUserName("");
  };

  const submitComment = async (e: any) => {
    e.preventDefault();
    if (!userComment) {
      alert("please write your comment");
      return;
    }

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
    const resData = await commentHandler(
      { comment, commentType: props.type },
      "POST",
    );

    resData.success ? initData() : alert(resData.message);
  };

  return (
    <div className="comment_form">
      <ToastMessage children={message} />
      <div className="comment_form_input">
        <input
          className="input_small"
          value={userName}
          placeholder="nickname"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUserName(e.target.value)
          }
        />
        <input
          className="input_small"
          value={password}
          placeholder="password"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <textarea
        value={userComment}
        placeholder="add comment here"
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setUserComment(e.target.value)
        }
      />
      <div className="comment_form_button">
        <button onClick={submitComment}>Submit</button>
      </div>
    </div>
  );
}
