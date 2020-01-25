import express from "express";
import routes from "../routes";
import { registerView, postAddComment } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, postAddComment);

export default apiRouter;
