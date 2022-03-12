const { Router } = require("express");
const router = Router();
const { createLink, getLinks } = require("./links.controller");

//Create new category
router.post("/links", createLink);
router.get("/links", getLinks);

module.exports = router;
