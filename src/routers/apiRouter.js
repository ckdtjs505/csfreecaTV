import express from "express";
import routes from "../routes";
import {
  registerView,
  postAddComment,
  postDeleteComment
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);

export default apiRouter;
