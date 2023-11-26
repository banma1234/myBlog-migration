export interface CardType {
  _id: string;
  title: string;
  thumbnail: string | undefined;
  uploadDate: string;
  postId: number;
  series?: string;
  description?: string;
}
