import getPost from "./getPost";
import commentHandler from "./commentHandler";
import mdParser from "./mdParser";
import COPY_CODE from "./postScript";

const Components = {
  getPost,
  commentHandler,
  mdParser,
  COPY_CODE,
};

export default Components;

export { getPost, commentHandler, mdParser, COPY_CODE };
