import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  avatarUrl: String,
  facebookId: Number,
  githubId: Number
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "email" });

const model = mongoose.model("user", UserSchema);
export default model;
