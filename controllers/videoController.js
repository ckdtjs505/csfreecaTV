import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

export const search = (req, res) => {
  const {
    query: { search_query: searchingBy }
  } = req;
  res.render("search", { pageTitle: "Search", searchingBy, videos });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description
  });
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  const { params } = req;
  try {
    const video = await Video.findById(params.id);
    res.render("videoDetail", { pageTitle: "Video Detail", video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

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
