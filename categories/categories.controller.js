const categoryModel = require("./categories.model");

const createCategory = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    if (!name || !description) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing",
      });
    }
    const newCategory = new categoryModel({
      name: name,
      description: description,
    });

    const category = await categoryModel.findOne({
      name,
    });

    if (category) {
      return res.status(400).json({
        message: "Category already exists!",
      });
    }
    const savedCategory = await newCategory.save();
    res.status(201).send({
      author: savedCategory,
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
  createCategory,
};
