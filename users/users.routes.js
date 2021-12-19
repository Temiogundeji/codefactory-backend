const { Router } = require("express");
const router = Router();
const { createUser, loginUser } = require("./users.controller");

router.post("/user/auth/signup", createUser);
router.post("/user/auth/login", loginUser);

module.exports = router;
