const db = require("../models");
const { Palette } = require("../models");

module.exports = {
  addLike: async (req, res) => {
    try {
      const paletteId = req.params.id;
      const userId = req.userId;
      // 1. params 로 팔레트 아이디를 받아온다.
      // 2. Cookie 를 이용해 유저아이디도 조회한다.
      const likeInfo = await db.sequelize.models.Likes.findOne({
        // Likes테이블에 userId가 존재하는지.
        where: {
          user_id: userId,
          palette_id: paletteId,
        },
      });
      if (likeInfo) {
        return res.status(409).json({ message: "이미 좋아요를 누르셨습니다." });
      }
      /* 3. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재하지않는다면, 
            palettes 테이블에 likeCount 컬럼을 1 증가시킨다*/
      await Palette.increment({ likeCount: 1 }, { where: { id: paletteId } });

      /* 4. Like 테이블에 팔레트 아이디와 유저 아이디를 추가해준다. */
      await db.sequelize.models.Likes.create({
        user_id: userId,
        palette_id: paletteId,
      });

      const paletteInfo = await Palette.findOne({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        where: {
          id: paletteId,
        },
      });

      return res.status(200).json({ data: paletteInfo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  deleteLike: async (req, res) => {
    // 1. params 로 키보드 아이디를 받아온다.
    try {
      const paletteId = req.params.id;
      const userId = req.userId;
      const likeInfo = await db.sequelize.models.Likes.findOne({
        // Likes테이블에 userId가 존재하는지.
        where: {
          user_id: userId,
          palette_id: paletteId,
        },
      });
      if (!likeInfo) {
        return res
          .status(409)
          .json({ message: "좋아요를 누르지 않으셨습니다." });
      }
      /* 3. Likes DB에 params로 받아온 아이디와 Cookie를 이용해 조회한 유저아이디가 존재하지않는다면, 
            palettes 테이블에 likeCount 컬럼을 1 감소시킨다*/
      await Palette.decrement({ likeCount: 1 }, { where: { id: paletteId } });

      /* Like 테이블에 팔레트 아이디와 유저 아이디를 삭제해준다. */
      await db.sequelize.models.Likes.destroy({
        where: {
          user_id: userId,
          palette_id: paletteId,
        },
      });

      return res.status(200).json({ message: "ok" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getUserLikes: async (req, res) => {
    try {
      // 1. Cookie를 이용해서 특정 유저가 좋아요 누른 팔레트 아이디를 조회한다.
      const userId = req.userId;
      // console.log(req.userId);
      const likePaletteInfo = []; // like 누른 palette의 정보를 넣음.

      let likeInfo = await db.sequelize.models.Likes.findAll({
        // Likes테이블에 있는 paletteId를 전부 가져온다.
        attributes: ["palette_id"],
        where: {
          user_id: userId,
        },
        raw: true,
      });
      likeInfo = likeInfo.map((el) => el.palette_id);
      // console.log(likeInfo);
      for (let i = 0; i < likeInfo.length; i++) {
        const paletteInfo = await Palette.findOne({
          where: {
            id: likeInfo[i],
          },
          raw: true,
        });
        likePaletteInfo.push(paletteInfo);
      }
      // 2. 조회한 palette 아이디로 palette 정보를 찾은 후 그 정보를 클라이언트에 보내준다.
      return res.status(200).json({ data: likePaletteInfo });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
