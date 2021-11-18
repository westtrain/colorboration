"use strict";
let XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let workbook = XLSX.readFile(__dirname + "/../public/tags.xlsx");
    let worksheet = workbook.Sheets["Sheet1"];

    let datas = [];
    // 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
    for (let i = 1; i <= 12; i++) {
      let obj = {
        name: worksheet["A" + i].w,
        isColorTag: worksheet["B" + i].w,
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
