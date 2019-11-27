import express from "express";

const videoRouter = express.Router();

videoRouter.get('/video', (req, res) => res.send("video") );

export default videoRouter;