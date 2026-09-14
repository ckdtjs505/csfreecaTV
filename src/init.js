/* eslint-disable import/first */
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

import "@babel/polyfill";
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
