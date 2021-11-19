"use strict";
const XLSX = require("xlsx");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = XLSX.readFile(__dirname + "/../public/tags.xlsx");
    const worksheet = workbook.Sheets["Sheet1"];

    const datas = [];
    // 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
    for (let i = 1; i <= 44; i++) {
      const obj = {
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

    return queryInterface.bulkInsert("Tags", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Tags", null, {});
  },
};
