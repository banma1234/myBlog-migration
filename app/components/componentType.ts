import { Dispatch, SetStateAction } from "react";

export interface CardType {
  title: string;
  thumbnail: string | undefined;
  uploadDate: string;
  postId: number;
}
