import dotenv from "dotenv";
import app from "./app";
import "./db";

import "./models/Video";
import "./models/Comment";
import "./models/User";

dotenv.config();

const { PORT } = process.env;

const handleListening = () =>
  console.log(`✅  Listening on: http://localhost:${PORT} `);

app.listen(PORT, handleListening);
