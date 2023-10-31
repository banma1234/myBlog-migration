import getAllPosts from "app/search/getAllPosts";
import getSeriesInfo from "./getSeriesInfo";
import postHandler from "./postHandler";
import { getPost } from "app/posts/[postId]/utils";

const Components = {
  getAllPosts,
  getSeriesInfo,
  getPost,
  postHandler,
};

export default Components;

export { getAllPosts, getSeriesInfo, getPost, postHandler };
