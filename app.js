import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import passport from "passport";
import { localMiddleware } from "./localMiddleware";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import "./passport";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/video", express.static("video"));
app.use("/static", express.static("static"));
app.use("/img", express.static("img"));

app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(passport.initialize());

app.use(localMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.videos, videoRouter);
app.use(routes.users, userRouter);

export default app;
