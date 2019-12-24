import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "video/" });

export const localMiddleware = (req, res, next) => {
  res.locals.title = "csTube";
  res.locals.routes = routes;
  res.locals.user = req.user || null;
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
