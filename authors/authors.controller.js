const authorsModel = require("./authors.model");
const {
  generateHash,
  comparePassword,
  isEmailValid,
  generateToken,
} = require("../utils/utils");

const createAuthor = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const hashPassword = generateHash(password);

    if (!username || !email || !password) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing!",
      });
    }

    if (!isEmailValid(email)) {
      return res.status(400).send({
        message: "Please enter a valid email address",
      });
    }
    const newAuthor = new authorsModel({
      username: username,
      email: email,
      password: hashPassword,
    });

    const author = await authorsModel.findOne({
      email: email,
    });

    if (author) {
      return res.status(400).json({
        message: "Author account already exists!",
      });
    }

    const savedAuthor = await newAuthor.save();
    res.status(201).send({
      author: savedAuthor,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: "error",
    });
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({
        status: "error",
        error: "Some values are missing!",
      });
    }

    if (!isEmailValid(email)) {
      return res.status(400).send({
        message: "Please enter a valid email address",
      });
    }

    const author = await authorsModel.findOne({ email: email });
    if (!author) {
      return res.status(400).json({
        message: "You do not have an account on this platform",
      });
    } else {
      const token = generateToken(email);
      if (!comparePassword(author.password, password)) {
        return res
          .status(400)
          .send({ message: "The password entered is incorrect!" });
      }

      return res.status(200).send({
        data: author,
        token: token,
        message: `Welcome back ${author.username}`,
        status: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createAuthor, loginAuthor };
