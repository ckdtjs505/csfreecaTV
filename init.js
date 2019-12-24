/* eslint-disable import/first */
import dotenv from "dotenv";

dotenv.config();

import "./db";
import app from "./app";
import "./models/Video";
import "./models/Comment";
import "./models/User";

const { PORT } = process.env;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT} `);

app.listen(PORT, handleListening);
