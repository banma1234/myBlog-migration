"use client";

import iconHandler from "util/iconHandler";
import Image from "next/image";
import "../../styles/commentStyle/commentBoxStyle.scss";
import { CommentMenu, UserCommentForm } from ".";
import { commentHandler } from "../../utils";
import { CommentType } from "../componentType";
import { useState, useEffect } from "react";

export default function CommentBox(props: { postId: number }) {
  const [replyClick, setReplyClick] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState<Array<CommentType> | undefined>(
    new Array<CommentType>()
  );

  useEffect(() => {
    const getComment = async () => {
      const res = await commentHandler(props.postId, "GET");
      setComments(res);
    };

    getComment();
  }, [props.postId]);

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
                <Image
                  className="comment_profile"
                  src="/profile.jpg"
                  alt="profile"
                  width={70}
                  height={70}
                />
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
