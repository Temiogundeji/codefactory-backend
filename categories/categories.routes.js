const { Router } = require("express");
const router = Router();
const { createCategory, getCategories } = require("./categories.controller");

//Create new category
router.post("/categories", createCategory);
router.get("/categories", getCategories);

module.exports = router;
