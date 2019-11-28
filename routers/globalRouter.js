import express from "express";
import routes from "../routes";

const grobalRouter = express.Router();

grobalRouter.get(routes.home, (req, res) => res.send("Home") );
grobalRouter.get(routes.join, (req, res) => res.send("Join") );
grobalRouter.get(routes.login, (req, res) => res.send("login") );
grobalRouter.get(routes.logout, (req, res) => res.send("logout") );
grobalRouter.get(routes.search, (req, res) => res.send("search") );

export default grobalRouter;


