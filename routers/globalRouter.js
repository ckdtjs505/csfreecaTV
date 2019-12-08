import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  login,
  logout,
  getJoin,
  postJoin
} from "../controllers/userController";

const grobalRouter = express.Router();

grobalRouter.get(routes.home, home);
grobalRouter.get(routes.join, getJoin);
grobalRouter.post(routes.join, postJoin);
grobalRouter.get(routes.login, login);
grobalRouter.get(routes.logout, logout);
grobalRouter.get(routes.search, search);

export default grobalRouter;
