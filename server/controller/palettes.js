const db = require("../models");
const { Palette, Tag_Palette, sequelize } = require("../models");
const { Op, literal } = require("sequelize");
const moment = require("moment");

module.exports = {
  getAllPalettes: async (req, res) => {
    // 1. 모든 palette를 조회해서 클라이언트로 보내준다. ( findAll )
    try {
      const paletteInfo = await Palette.findAll({
        raw: true,
      });
      return res.status(200).json({ data: paletteInfo });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getFiltered: async (req, res) => {
    try {
      const tags = req.body.tags;
      const filteredPalettesInfos = [];

      const paletteIdOnly = await db.sequelize.models.Tag_Palette.findAll({
        attributes: ["palette_id"],
        where: {
          [Op.or]: { tag_id: tags },
        },
        group: "palette_id",
        having: literal(`count(palette_id) = ${tags.length}`),
        raw: true,
      });
      // paletteIdOnly = [ { palette_id: 1 }, { palette_id: 2 } ]
      for (let id of paletteIdOnly) {
        const filteredPalettesInfo = await Palette.findAll({
          where: { id: id.palette_id },
          raw: true,
        });
        // console.log(filteredPalettesInfo[0]);
        filteredPalettesInfos.push(filteredPalettesInfo[0]);
      }
      return res.status(200).json({ data: filteredPalettesInfos });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  },
  getPalette: async (req, res) => {
    try {
      // 1. params 로 paletteId를 받아온다.
      const paletteId = req.params.id;
      // 2. 선택한 팔레트를 조회한 후 클라이언트로 보내준다.
      const getPalette = await Palette.findOne({
        where: {
          id: paletteId,
        },
        raw: true,
      });
      return res.status(200).json({ data: getPalette });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getRandom: async (req, res) => {
    // 1. 모든 palette를 램덤으로 조회해서 클라이언트로 보내준다. ( findAll )
    try {
      const paletteInfo = await Palette.findAll({
        order: sequelize.random(),
        raw: true,
      });
      // console.log(paletteInfo, " www");
      return res.status(200).json({ data: paletteInfo });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  getRanking: async (req, res) => {
    // 1. 모든 palette를 램덤으로 조회해서 클라이언트로 보내준다. ( findAll )
    const period = req.query.period;
    if (period === "week") {
      try {
        const palettesInfo = await Palette.findAll({
          where: {
            createdAt: {
              // 현재 시점에서 7일만
              [Op.gte]: moment().subtract(7, "days").toDate(),
            },
          },
          order: [["likeCount", "DESC"]],
          raw: true,
        });
        // console.log(palettesInfo);
        return res.status(200).json({ data: palettesInfo });
      } catch (error) {
        return res.status(500).json({ message: "Server Error" });
      }
    } else if (period === "months") {
      try {
        const palettesInfo = await Palette.findAll({
          where: {
            createdAt: {
              [Op.gte]: moment().subtract(1, "months").toDate(),
            },
          },
          order: [["likeCount", "DESC"]],
          raw: true,
        });
        return res.status(200).json({ data: palettesInfo });
      } catch (error) {
        return res.status(500).json({ message: "Server Error" });
      }
    } else {
      try {
        const palettesInfo = await Palette.findAll({
          order: [["likeCount", "DESC"]],
          raw: true,
        });
        return res.status(200).json({ data: palettesInfo });
      } catch (error) {
        return res.status(500).json({ message: "Server Error" });
      }
    }
  },
  getUserPalette: async (req, res) => {
    // 1. params 로 userId를 받아온다.
    const userId = req.query.user_id;
    // console.log(userId, "dsfsdfsdf");
    // 2. userId를 갖고 있는 모든 palette를 조회해서 클라이언트로 보내준다. ( findAll )
    try {
      const paletteInfo = await Palette.findAll({
        where: {
          user_id: userId,
        },
        raw: true,
      });
      return res.status(200).json({ data: paletteInfo });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
  createPalette: async (req, res) => {
    const userId = req.userId;
    // 1. color0, color1, color2, color3를 클라이언트에서 받아온다.
    const { color0, color1, color2, color3, tags } = req.body;
    try {
      if (color0 && color1 && color2 && color3) {
        await Palette.create({
          color0: color0,
          color1: color1,
          color2: color2,
          color3: color3,
          user_id: userId,
          likeCount: 0,
        }).then((data) => {});
        return res.sendStatus(200);
      }
      return res
        .status(422)
        .json({ message: "insufficient parameters supplied" });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
