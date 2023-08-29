import { Dispatch, SetStateAction } from "react";

export interface CommentType {
  _id: string;
  REF: number;
  RE_STEP: number;
  RE_LEVEL: number;
  date: string;
  writter: string;
  content: string;
}

export interface CommentBoxType {
  postId: number;
  comment: Array<CommentType> | undefined;
}

export interface UserCommentFormType {
  data: CommentType | undefined;
  postId: number;
  type: "DEFAULT" | "REPLY";
  setComments: Dispatch<SetStateAction<CommentType[] | undefined>>;
}

export interface UserCommentType {
  REF: number;
  RE_STEP: number;
  RE_LEVEL: number;
  postId: number;
  date: string;
  writter: string;
  password: string;
  content: string;
}

export interface TreeHandlerType {
  REF: (
    data: UserCommentFormType["data"],
    type: UserCommentFormType["type"],
  ) => number;
  RE_STEP: (
    data: UserCommentFormType["data"],
    type: UserCommentFormType["type"],
  ) => number;
  RE_LEVEL: (
    data: UserCommentFormType["data"],
    type: UserCommentFormType["type"],
  ) => number;
}
