import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import Video from "../models/Video";

export const getJoin = (req, res) => res.render("join", { pageTitle: "Join" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 }
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({
        name,
        email
      });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
    }
  }
};

export const getLogin = (req, res) =>
  res.render("login", { pageTitle: "Login" });

export const postLogin = passport.authenticate("local", {
  successRedirect: routes.home,
  failureRedirect: routes.login
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = async (req, res) => {
  const videos = await Video.find({}).sort({ _id: -1 });
  res.render("userDetail", { pageTitle: "UserDetail", user: req.user, videos });
};

export const users = (req, res) => res.render("users", { pageTitle: "Users" });

export const userDetail = async (req, res) => {
  const {
    params: { id }
  } = req;

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      try {
        const videos = await Video.find({}).sort({ _id: 1 });
        res.render("userDetail", { pageTitle: "UserDetail", user, videos });
      } catch (error) {
        res.render("userDetail", { pageTitle: "UserDetail", user, videos: [] });
      }
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EditProfile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file
  } = req;

  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? `/${file.path}` : req.user.avatarUrl
    });
    res.redirect(`/users${routes.me}`);
  } catch (error) {
    console.log(error);
    res.render("editProfile", { pageTitle: "EditProfile" });
  }
};

export const changePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "ChangePassword" });

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    // eslint-disable-next-line camelcase
    _json: { id, name, avatar_url, email }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      avatarUrl: avatar_url,
      githubId: id
    });
    console.log(newUser);
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub, name, picture }
  } = profile;
  const email = profile.emails[0].value;
  try {
    const user = await User.findOne({ name });
    if (user) {
      user.googleId = sub;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      name,
      email,
      googleId: sub,
      avatarUrl: picture
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const kakaoLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: {
      id,
      properties: { nickname, profile_image: profileImg },
      kakao_account: { email }
    }
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      kakaoId: id,
      email,
      name: nickname,
      avatarUrl: profileImg
    });
    return cb(null, newUser);
  } catch (error) {
    console.log(error);
    return cb(error);
  }
};

export const postsnsLogIn = (req, res) => {
  res.redirect(routes.home);
};
