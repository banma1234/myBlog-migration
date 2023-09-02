"use client";

import "../../styles/commentStyle/commentBoxStyle.scss";
import { useState } from "react";
import iconHandler from "util/iconHandler";
import { CommentBoxType, CommentType } from "../componentType";
import UserCommentForm from "./userCommentForm";
import CommentMenu from "./commentMenu";
import Image from "next/image";

export default function CommentBox(props: CommentBoxType) {
  const [replyClick, setReplyClick] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState<Array<CommentType> | undefined>(
    props.comment
  );

  const setTarget = (id: string, type: string) => {
    switch (type) {
      case "MENU":
        setMenuClick(!menuClick);
        setCommentId(id);
        break;
      case "REPLY":
        setReplyClick(!replyClick);
        setCommentId(id);
        break;
    }
  };

  return (
    <>
      {comments &&
        comments.map((item: CommentType, i: number) => {
          return (
            <div className="comment" key={i}>
              <div
                className="comment_id"
                style={{ width: `${100 - item.RE_LEVEL * 6}%` }}
                key={i}
              >
                <div className="profile_wrapper">
                  <Image
                    src="/default_profile.jpg"
                    alt="profile"
                    width={70}
                    height={70}
                  />
                </div>
                <div className="content">
                  <div className="content_info">
                    <span className="content_info_writter">{item.writter}</span>
                    <span className="content_info_date">{item.date}</span>
                  </div>
                  {item.content}
                </div>
                <div>
                  <div
                    className="content_icon"
                    onClick={() => {
                      setTarget(item._id, "MENU");
                    }}
                  >
                    {iconHandler("cancel", "18")}
                  </div>
                  {menuClick && commentId === item._id && (
                    <CommentMenu
                      data={item}
                      postId={props.postId}
                      setComments={setComments}
                    />
                  )}
                </div>
                <div
                  className="content_menu"
                  onClick={() => {
                    setTarget(item._id, "REPLY");
                  }}
                >
                  <div>
                    {replyClick && commentId === item._id ? "cancel" : "reply"}
                  </div>
                </div>
                {replyClick && commentId === item._id && (
                  <UserCommentForm
                    data={item}
                    postId={props.postId}
                    type="REPLY"
                    setComments={setComments}
                  />
                )}
              </div>
            </div>
          );
        })}
      <UserCommentForm
        data={comments ? comments.slice(-1)[0] : undefined}
        postId={props.postId}
        type="DEFAULT"
        setComments={setComments}
      />
    </>
  );
}
