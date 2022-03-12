const usersModel = require("./users.model");
const {
  generateHash,
  comparePassword,
  isEmailValid,
  generateToken,
} = require("../utils/utils");

const createUser = async (req, res, next) => {
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
    const newuser = new usersModel({
      username: username,
      email: email,
      password: hashPassword,
    });

    const user = await usersModel.findOne({
      email: email,
    });

    if (user) {
      return res.status(400).json({
        message: "user account already exists!",
      });
    }

    const savedUser = await newuser.save();
    res.status(201).send({
      user: savedUser,
      status: "success",
    });
  } catch (e) {
    return res.status(400).json({
      message: e.message,
      status: "error",
    });
  }
};

const loginUser = async (req, res) => {
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

    const user = await usersModel.findOne({ email: email }).populate("courses");
    if (!user) {
      return res.status(400).json({
        message: "You do not have an account on this platform",
      });
    } else {
      const token = generateToken(email);
      if (!comparePassword(user.password, password)) {
        return res
          .status(400)
          .send({ message: "The password entered is incorrect!" });
      }

      return res.status(200).send({
        data: user,
        token: token,
        message: `Welcome back ${user.username}`,
        status: "success",
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createUser, loginUser };
