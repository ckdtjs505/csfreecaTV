import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/cstube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

const handleOpen = () => console.log("✔ Connect to DB");
const handleError = error => console.log(`😂 Error on DB connection :${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
