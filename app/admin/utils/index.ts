import getAllPosts from "app/search/getAllPosts";
import getSeriesInfo from "./getSeriesInfo";
import { getPost } from "app/posts/[postId]/utils";

const Components = {
  getAllPosts,
  getSeriesInfo,
  getPost,
};

export default Components;

export { getAllPosts, getSeriesInfo, getPost };
