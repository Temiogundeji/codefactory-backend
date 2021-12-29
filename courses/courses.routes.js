const { Router } = require("express");
const multer = require("multer");
const { imageStorage } = require("../utils/cloudinaryConfig");

const parser = multer({ storage: imageStorage });
const parserConst = parser.single("image");

const router = Router();
const { createCourse, getCourses } = require("./courses.controller");

router.post("/courses", parserConst, createCourse);
router.get("/courses", getCourses);

module.exports = router;
