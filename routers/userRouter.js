import express from "express";
import routes from "../routes";
import {
  userDetail,
  changePassword,
  getEditProfile,
  postEditProfile
} from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.changePassword, changePassword);

userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, postEditProfile);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
