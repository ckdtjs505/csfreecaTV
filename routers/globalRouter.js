import express from "express";
import routes from "../routes";
import { home, join, login, logout, search } from "../controllers/globalController";

const grobalRouter = express.Router();

grobalRouter.get(routes.home, home);
grobalRouter.get(routes.join, join);
grobalRouter.get(routes.login, login);
grobalRouter.get(routes.logout, logout);
grobalRouter.get(routes.search, search);

export default grobalRouter;


