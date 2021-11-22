const express = require("express");
const tagsController = require("../controller/tags");

const router = express.Router();

router.get("/", tagsController.getAllTags); // 모든 태그 조회

module.exports = router;
