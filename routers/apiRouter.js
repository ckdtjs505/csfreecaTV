import express from "express";
import routes from "../routes";
import { registerView } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.get(routes.registerView, registerView);

export default apiRouter;
