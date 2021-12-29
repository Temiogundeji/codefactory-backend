const { Router } = require("express");
const router = Router();
const { createCategory } = require("./categories.controller");

//Create new category
router.post("/categories", createCategory);

module.exports = router;
