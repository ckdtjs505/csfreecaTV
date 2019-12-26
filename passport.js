import passport from "passport";
import GithubStrategy from "passport-github";
import User from "./models/User";

passport.use(User.createStrategy());

const githubCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, username, avatar_url, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      console.log(user);
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name: username,
      avatarUrl: avatar_url,
      githubId: id
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/github/callback"
    },
    githubCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
