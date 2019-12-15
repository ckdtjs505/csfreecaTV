import mongoose from "mongoose";

const db = mongoose.connection;

mongoose.connect("mongodb://localhost:27017/cstube", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const handleError = error => {
  console.log(`❌ db connect error : ${error}`);
};

const handleOpen = () => {
  console.log("✅  db connected ");
};

db.on("error", handleError);
db.once("open", handleOpen);
