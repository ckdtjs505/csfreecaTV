import express from "express";
import routes from "../routes";
import {
  registerView,
  postAddComment,
  postDeleteComment,
  getBroadList
} from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);
apiRouter.post(routes.deleteComment, postDeleteComment);
apiRouter.get(routes.broadList, getBroadList);

export default apiRouter;
