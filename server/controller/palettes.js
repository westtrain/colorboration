const db = require("../models");
const { Palette, Tag, sequelize } = require("../models");
const { Op } = require("sequelize");
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
      const paletteIds = [];
      const paletteIdsAndTagIds = [];
      const tagObjs = [];
      for (let tag of tags) {
        tagObjs.push({ tag_id: tag });
      }
      // console.log(tagObjs);
      // [1,4]
      // [Op.and]: [{tag_id: 5}, {tag_id: 6}]
      // for (let tag of tags) {
      const info = await db.sequelize.models.Tag_Palette.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt", "tag_id"],
        },
        where: {
          [Op.and]: [{ tag_id: 1 }, { tag_id: 2 }],
          // tag_id: tag,
        },
        raw: true,
      });

      // console.log(paletteIdsAndTagIds);
      // const filteredPalettesInfo = await Palette.findAll({
      //   where: {
      //     switch: {
      //       [Op.or]: getSwitch,
      //     },
      //     color: color !== 2 ? color : { [Op.or]: [0, 1] },
      //     backlight: backlight !== 2 ? backlight : { [Op.or]: [0, 1] },
      //     tenkey: tenkey !== 2 ? tenkey : { [Op.or]: [0, 1] },
      //     bluetooth: bluetooth !== 2 ? bluetooth : { [Op.or]: [0, 1] },
      //     price: {
      //       [Op.lte]: price,
      //     },
      //   },
      //   raw: true,
      // });
      // return res.status(200);
      return res.status(200).json({ data: filteredPalettesInfo });
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
    // 1. color1, color2, color3, color4를 클라이언트에서 받아온다.
    const { color1, color2, color3, color4 } = req.body;
    try {
      if (color1 && color2 && color3 && color4) {
        await Palette.create({
          color1: color1,
          color2: color2,
          color3: color3,
          color4: color4,
          user_id: userId,
          likeCount: 0,
        });
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
