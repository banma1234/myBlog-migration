"use client";

import "../../styles/commentBoxStyle.scss";
import { useState } from "react";
import { useIcons } from "util/hooks";
import { CommentBoxType, CommentType } from "../componentType";
import UserCommentForm from "./userCommentForm";
import Image from "next/image";
// import getComment from "../../getComment";

export default function CommentBox(props: CommentBoxType) {
  const [replyClick, setReplyClick] = useState(false);
  const [menuClick, setMenuClick] = useState(false);
  const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState<Array<CommentType> | undefined>(
    props.comment,
  );

  return (
    <div className="container">
      {comments &&
        comments.map((item: CommentType, i: number) => {
          return (
            <div className="comment" key={i}>
              <div
                className="comment_id"
                style={{ width: `${100 - item.RE_LEVEL * 6}%` }}
                key={i}
              >
                <div>힝</div>
                <div className="content">
                  <div className="content_info">
                    <span className="content_info_writter">{item.writter}</span>
                    <span className="content_info_date">{item.date}</span>
                  </div>
                  <p>{item.content}</p>
                </div>
                <div
                  onClick={() => {
                    setCommentId(item._id);
                    setMenuClick(!menuClick);
                  }}
                >
                  {useIcons("cancel", "18")}
                </div>
                <div
                  className="content_menu"
                  onClick={() => {
                    setCommentId(item._id);
                    setReplyClick(!replyClick);
                  }}
                >
                  <p>
                    {replyClick && commentId === item._id ? "취소" : "답글달기"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      <UserCommentForm
        data={comments ? comments[0] : undefined}
        postId={props.postId}
        type="DEFAULT"
        setComments={setComments}
      />
    </div>
  );
}
