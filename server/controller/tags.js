const { Tag, sequelize } = require("../models");

module.exports = {
  getAllTags: async (req, res) => {
    // 1. 모든 palette를 조회해서 클라이언트로 보내준다. ( findAll )
    try {
      const tagInfo = await Tag.findAll({
        raw: true,
      });
      return res.status(200).json({ data: tagInfo });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  },
};
