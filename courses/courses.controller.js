const courseModel = require("./courses.model");
const createCourse = async (req, res, next) => {
  const { title, about, duration, category, author } = req.body;
  //Convert category and author to number
  const categoryNumber = Number(category);
  const authorNumber = Number(category);
  try {
    const { path } = req.file;
    if (!title || !about || !duration || !category || !author) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing!",
      });
    }
    const newCourse = new courseModel({
      title,
      image: path,
      about,
      duration,
      categoryNumber,
      authorNumber,
    });

    const course = await courseModel.findOne({
      title,
    });

    if (course) {
      return res.status(400).json({
        message: "Course already exists!",
      });
    }
    const savedCourse = await newCourse.save();
    res.status(201).send({
      course: savedCourse,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: "error",
    });
  }
};

const getCourses = async (req, res, next) => {
  try {
    const courses = await courseModel.find({});
    res.status(201).send({
      courses: courses,
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
  createCourse,
  getCourses,
};
