import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: "text is requeired"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
