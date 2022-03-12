const linkModel = require("./links.model");

const createLink = async (req, res, next) => {
  const { title, linkText, course } = req.body;
  try {
    if (!title || !linkText || !course) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing",
      });
    }
    const newLink = new linkModel({
      title,
      linkText,
      course,
    });

    const category = await linkModel.findOne({
      title,
    });

    if (category) {
      return res.status(400).json({
        message: "Link already exists!",
      });
    }
    const savedLink = await newLink.save();
    res.status(201).send({
      category: savedLink,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: "error",
    });
  }
};

const getLinks = async (req, res, next) => {
  try {
    const links = await linkModel.find({});
    res.status(201).send({
      links: links,
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
  createLink,
  getLinks,
};
