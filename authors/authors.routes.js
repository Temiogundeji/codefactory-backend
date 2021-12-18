const { Router } = require("express");
const router = Router();
const { createAuthor, loginAuthor } = require("./authors.controller");

router.post("/author/auth/signup", createAuthor);
router.post("/author/auth/login", loginAuthor);

module.exports = router;
