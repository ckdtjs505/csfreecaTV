import mongoose, { Schema } from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  fileUrl: String,
  decription: String,
  views: {
    type: Number,
    default: 0
  },
  data: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("video", videoSchema);
export default model;
