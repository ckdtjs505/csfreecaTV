import mongoose, { Schema } from "mongoose";

const VideoSchema = new Schema({
  fileUrl: {
    type: String,
    required: "file Url is required"
  },
  title: {
    type: String,
    required: "title is require"
  },
  description: String,
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const model = mongoose.model("video", VideoSchema);
export default model;
