"use client";

import "../../styles/commentBoxStyle.scss";
import { useState } from "react";
import Image from "next/image";
// import getComment from "../../getComment";

export default function CommentBox(props: { postId: string; comment?: any }) {
  //   const [replyClick, setReplyClick] = useState(false);
  //   const [menuClick, setMenuClick] = useState(false);
  //   const [commentId, setCommentId] = useState("");
  const [comments, setComments] = useState<Array<any>>(props.comment);

  return (
    <div className="container">
      {comments &&
        comments.map((item: any, i: number) => {
          return (
            <div className="comment">
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
                <span>X</span>
                <div className="content_menu">
                  <p>답글달기</p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}
