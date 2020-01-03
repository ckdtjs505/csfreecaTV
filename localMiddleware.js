import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/video/" });
const multerAvatar = multer({ dest: "uploads/image/" });

export const localMiddleware = (req, res, next) => {
  res.locals.title = "csTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  console.log(res.locals.loggedUser);
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatarFile");
