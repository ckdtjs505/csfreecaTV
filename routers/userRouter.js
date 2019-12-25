import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  getEditProfile,
  postEditProfile
} from "../controllers/userController";
import { onlyPrivate } from "../localMiddleware";

const userRouter = express.Router();

userRouter.get(routes.changePassword, onlyPrivate, changePassword);

userRouter.get(routes.editProfile, onlyPrivate, getEditProfile);
userRouter.post(routes.editProfile, onlyPrivate, postEditProfile);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
