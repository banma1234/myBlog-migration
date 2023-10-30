import { Session } from "next-auth";
import { Dispatch, SetStateAction } from "react";

/*
 * comment 표준 type
 */
export interface CommentType {
  _id: string;
  REF: number;
  RE_STEP: number;
  RE_LEVEL: number;
  date: string;
  writter: string;
  content: string;
  isAdmin: boolean;
  profile?: string;
}

export interface UserCommentFormType {
  data: CommentType | undefined;
  postId: number;
  type: "DEFAULT" | "REPLY";
  setComments: Dispatch<SetStateAction<CommentType[] | undefined>>;
  setClose?: Dispatch<SetStateAction<boolean>>;
  session?: Session | null;
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
  isAdmin: boolean;
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

export interface DropdownType {
  data: CommentType;
  setComments: UserCommentFormType["setComments"];
  postId: number;
}

export interface TargetType extends CommentType {
  password: string;
}
