const express = require("express");
const palettesController = require("../controller/palettes");
const isAuth = require("../middleware/verifyToken");

const router = express.Router();
// 엔드포인트 접근시 로그인 확인 절차 필요 IsAuth함수를 미들웨어에서 가져다 쓰면 어떨까 생각중...로그아웃 처럼
router.get("/entire", palettesController.getAllPalettes); // 모든 팔레트 조회
router.get("/random", palettesController.getRandom); // 팔레트들을 랜덤으로 조회
router.get("/", palettesController.getUserPalette); // 특정 유저가 만든 팔레트 모음 조회
router.get("/ranking", palettesController.getRanking); // 팔레트의 좋아요 순으로 내림차순으로 조회
router.get("/filtered", palettesController.getFiltered); // 필터는 통한 팔레트 조회
router.post("/", isAuth, palettesController.createPalette); // 새로운 팔레트 추가
router.get("/:id", palettesController.getPalette); // 특정 팔레트 상세페이지 조회

module.exports = router;
