import passport from "passport";
import User from "./models/User";

passport.use(User.createStrategy()); // 미들웨어로 등록

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
