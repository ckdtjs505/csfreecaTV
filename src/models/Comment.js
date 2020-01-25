import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema({
  text: {
    type: String,
    required: "text is requeired"
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }
});

const model = mongoose.model("Comment", CommentSchema);
export default model;
