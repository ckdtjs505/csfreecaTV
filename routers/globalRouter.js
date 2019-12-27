import express from "express";
import passport from "passport";
import routes from "../routes";
import { home, search } from "../controllers/videoController";
import {
  logout,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  postsnsLogIn
} from "../controllers/userController";
import { onlyPublic } from "../localMiddleware";

const grobalRouter = express.Router();

grobalRouter.get(routes.home, home);

grobalRouter.get(routes.join, onlyPublic, getJoin);
grobalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

grobalRouter.get(routes.login, onlyPublic, getLogin);
grobalRouter.post(routes.login, onlyPublic, postLogin);

grobalRouter.get(routes.logout, logout);

// github
grobalRouter.get(routes.github, passport.authenticate("github"));

grobalRouter.get(
  routes.githubCallback,
  passport.authenticate("github", { failureRedirect: routes.login }),
  postsnsLogIn
);

// Google
grobalRouter.get(
  routes.google,
  passport.authenticate("google", { scope: ["profile", "email"] })
);

grobalRouter.get(
  routes.googleCallback,
  passport.authenticate("google", { failureRedirect: routes.login }),
  postsnsLogIn
);

// Kakao
grobalRouter.get(
  routes.kakao,
  passport.authenticate("kakao", { failureRedirect: routes.login })
);

grobalRouter.get(
  routes.kakaoCallback,
  passport.authenticate("kakao", { failureRedirect: routes.login }),
  postsnsLogIn
);

grobalRouter.get(routes.search, search);

export default grobalRouter;
