import express from "express";

const grobalRouter = express.Router();

grobalRouter.get('/', (req, res) => res.send("main page") );

export default grobalRouter;