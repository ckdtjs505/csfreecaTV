import mongoose, { Schema } from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  kakaoId: Number,
  githubId: Number,
  googleId: Number,
  comment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "video"
    }
  ]
});

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("User", userSchema);
export default model;
