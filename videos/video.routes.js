const { Router } = require("express");

const router = Router();
const { createVideo, getVideos } = require("./videos.controller");

router.post("/videos", createVideo);
router.get("/videos", getVideos);

module.exports = router;
