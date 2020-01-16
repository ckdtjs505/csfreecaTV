import express from "express";
import routes from "../routes";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);

export default apiRouter;
