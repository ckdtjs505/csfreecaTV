import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connect to DB");
const handleError = error =>
  console.log(`❌  Error on DB connection :${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
