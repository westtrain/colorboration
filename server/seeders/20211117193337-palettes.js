"use strict";
let XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let workbook = XLSX.readFile(__dirname + "/../public/palettes.xlsx");
    let worksheet = workbook.Sheets["Sheet1"];

    let datas = [];
    // 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
    for (let i = 1; i <= 12; i++) {
      let obj = {
        color0: worksheet["A" + i].w,
        color1: worksheet["B" + i].w,
        color2: worksheet["C" + i].w,
        color3: worksheet["D" + i].w,
        user_id: null,
        likeCount: 0,
        createdAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
        updatedAt: new Date()
          .toISOString()
          .replace(/T/, " ")
          .replace(/\..+/, ""),
      };
      datas.push(obj);
    }

    return queryInterface.bulkInsert("lecs", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("lecs", null, {});
  },
};
