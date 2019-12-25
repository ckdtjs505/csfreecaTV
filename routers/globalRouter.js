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
import { onlyPublic } from "../localMiddleware";

const grobalRouter = express.Router();

grobalRouter.get(routes.home, home);

grobalRouter.get(routes.join, onlyPublic, getJoin);
grobalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

grobalRouter.get(routes.login, onlyPublic, getLogin);
grobalRouter.post(routes.login, onlyPublic, postLogin);

grobalRouter.get(routes.logout, logout);

grobalRouter.get(routes.search, search);

export default grobalRouter;
