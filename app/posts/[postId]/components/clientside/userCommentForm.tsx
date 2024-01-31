"use client";

import parseDate from "util/parseDate";
import ToastMessage from "app/components/clientside/toastMessage";
import { ChangeEvent, useState } from "react";
import { commentHandler } from "../../utils";
import {
  UserCommentFormType,
  UserCommentType,
  TreeHandlerType,
} from "../componentType";
import "../../styles/commentStyle/userCommentStyle.scss";

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
    if (data && type === "REPLY") {
      return data.RE_STEP;
    } else {
      return 0;
    }
  },

  RE_LEVEL(data, type) {
    if (data && type === "REPLY") {
      return data.RE_LEVEL + 1;
    } else {
      return 0;
    }
  },

  RE_PARENT(data, type) {
    if (data && type === "REPLY") {
      return data._id;
    } else {
      return undefined;
    }
  },
};

export default function UserCommentForm(props: UserCommentFormType) {
  const [userComment, setUserComment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const session = props.session;

  const initData = async () => {
    const newComment = await commentHandler(props.postId.toString(), "GET");
    props.setComments(newComment);

    setUserComment("");
    setPassword("");
    setUserName("");

    if (props.type === "REPLY" && props.setClose) {
      props.setClose(false);
    }
  };

  const submitComment = async (e: any) => {
    e.preventDefault();
    if (!userComment) {
      alert("댓글을 입력해주세요.");
      return;
    }
    if (userName === "초코햄") {
      alert("해당 닉네임은 사용할 수 없습니다.");
      return;
    }

    const comment: UserCommentType = {
      REF: treeHandler.REF(props.data, props.type),
      RE_STEP: treeHandler.RE_STEP(props.data, props.type),
      RE_LEVEL: treeHandler.RE_LEVEL(props.data, props.type),
      RE_PARENT: treeHandler.RE_PARENT(props.data, props.type),
      postId: props.postId,
      date: parseDate(new Date()),
      writter: session ? (session.user?.name as string) : userName,
      password: password,
      content: userComment,
      isAdmin: session ? true : false,
    };

    await commentHandler({ comment, commentType: props.type }, "POST");

    initData();
  };

  return (
    <div className="comment__form">
      {props.type === "DEFAULT" && <ToastMessage>{message}</ToastMessage>}
      <div className="comment__form__input">
        {!session && (
          <input
            id="input__nickname"
            className="input__small"
            value={userName}
            placeholder="닉네임"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUserName(e.target.value)
            }
          />
        )}
        <input
          id="input__password"
          className="input__small"
          value={password}
          placeholder="비밀번호"
          type="password"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </div>
      <textarea
        id="textarea__comment"
        value={userComment}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setUserComment(e.target.value)
        }
      />
      <div className="comment__form__button">
        <button onClick={submitComment}>Submit</button>
      </div>
    </div>
  );
}
