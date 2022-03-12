const videoModel = require("./videos.model");
// const courseModel = require("../courses/courses.model");

const createVideo = async (req, res) => {
  const { title, duration, source, course, author } = req.body;

  //Convert category and author to number;
  try {
    if (!title || !duration || !course || !source || !author) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing!",
      });
    }
    const newVideo = new videoModel({
      title,
      duration,
      source,
      course,
      author,
    });

    const video = await videoModel.findOne({
      title,
    });
    if (video) {
      return res.status(400).json({
        message: "Video already exists!",
      });
    }
    const savedVideo = await newVideo.save();
    res.status(201).send({
      course: savedVideo,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: "error",
    });
  }
};

const getVideos = async (req, res, next) => {
  try {
    const videos = await videoModel.find({});
    res.status(200).send({
      videos: videos,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: "error",
    });
  }
};

module.exports = {
  createVideo,
  getVideos,
};
