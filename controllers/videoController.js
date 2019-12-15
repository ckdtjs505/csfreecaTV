// import { videos } from "../db";
import routes from "../routes";

export const home = (req, res) =>
  res.render("home", { pageTitle: "Home", videos });

export const search = (req, res) => {
  const {
    query: { search_query: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  res.redirect(routes.videoDetail(123));
};

export const videoDetail = (req, res) =>
  res.render("videoDetail", { pageTitle: "Video Detail" });

export const getEditVideo = (req, res) => {
  res.render("editVideo", { pageTitle: "Edit Video" });
};

export const postEditVideo = (req, res) => {
  const {
    body: { file, title, description }
  } = req;
  console.log(req.body);
  res.redirect(routes.videoDetail(123));
};

export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Deletet Video" });
