"use strict";
const XLSX = require("xlsx");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workbook = XLSX.readFile(__dirname + "/../public/users10.xlsx");
    const worksheet = workbook.Sheets["Sheet1"];

    const datas = [];
    // 행의갯수만큼 반복 , 열의갯수만큼 알파벳추가
    for (let i = 1; i <= 10; i++) {
      //   const hashed = bcrypt.hash(worksheet["B" + i].w, 10);
      const obj = {
        email: worksheet["A" + i].w,
        password: worksheet["B" + i].w,
        name: worksheet["C" + i].w,
        socialType: "local",
        image: "default.jps",
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

    return queryInterface.bulkInsert("Users", datas, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
