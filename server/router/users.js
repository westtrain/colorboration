const express = require("express");
const usersController = require("../controller/user");
// const checkTokenController = require("../controller/auth");
const isAuth = require("../middleware/verifyToken");
const { uploads } = require("../middleware/upload");

const router = express.Router();

router.get("/", isAuth, usersController.getUser); // mypage 유저정보 조회
router.post("/", isAuth, uploads.single("img"), usersController.updateProfile); // 유저 프로파일 이미지 저장
router.patch("/", isAuth, usersController.updateUser); // 유저정보수정
router.delete("/", isAuth, usersController.deleteUser); // 회원탈퇴
router.get("/checkToken", usersController.checkToken); // 토큰체크

module.exports = router;
