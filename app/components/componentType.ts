import { Dispatch, SetStateAction } from "react";

export interface CardType {
  _id: string;
  title: string;
  thumbnail: string | undefined;
  uploadDate: string;
  postId: number;
  description?: string;
}
