import express from "express";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin
} from "../controllers/userController";

const grobalRouter = express.Router();

grobalRouter.get(routes.home, home);

grobalRouter.get(routes.join, getJoin);
grobalRouter.post(routes.join, postJoin, postLogin);

grobalRouter.get(routes.login, getLogin);
grobalRouter.post(routes.login, postLogin);

grobalRouter.get(routes.logout, logout);

grobalRouter.get(routes.search, search);

export default grobalRouter;
