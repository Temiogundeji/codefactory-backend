const coursesModel = require("./courses.model");

const createCourse = async (req, res, next) => {
  const { title, about, duration, category, author, isFavorite } = req.body;
  try {
    const { path } = req.file;
    if (!title || !about || !duration || !category || !author || !isFavorite) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing!",
      });
    }
    const newCourse = new coursesModel({
      title,
      image: path,
      about,
      duration,
      category,
      author,
      isFavorite,
    });

    const course = await coursesModel.findOne({
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
    const courses = await coursesModel.find({}).populate({
      path: "videos",
      select: "title duration source author",
    });

    console.log(courses);
    res.status(200).send({
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
