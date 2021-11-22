const { User } = require("../models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

// const { checkToken } = require("./tokenfunction/index");
const {
  generateAccessToken,
  sendAccessToken,
} = require("./tokenFunction/index");

module.exports = {
  getUser: async (req, res) => {
    console.log(req.headers.Authorization);
    // 1. Cookie 를 이용해서 ( req.userId ) 유저정보를 가져온다.
    const userInfo = await User.findOne({
      attributes: ["id", "email", "name", "socialType", "image"],
      where: { id: req.userId },
      raw: true,
    });
    // 2. 가져온 유저정보를 res에 담아서 클라이언트로 보내준다.
    try {
      if (userInfo) {
        return res.status(200).json({ data: userInfo });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  updateProfile: async (req, res) => {
    // 1. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const userId = req.userId;
    // 2. req.file안에 이미지가 업로드되어 있다면, 프로파일 이미지를 업데이트한다.
    try {
      // console.log(req.file.filename);
      if (req.file) {
        await User.update(
          {
            image: req.file.filename,
          },
          { where: { id: userId } }
        );
        // 3. 업데이트된 유저정보를 res에 담아서 클라이언트로 보내준다.
        const updateUserInfo = await User.findOne({
          attributes: ["id", "email", "name", "socialType", "image"],
          where: { id: userId },
          raw: true,
        });

        if (updateUserInfo) {
          return res.status(200).json({ data: updateUserInfo });
        }
        return res.status(401).json({ message: "Unauthorized Request" });
      } else {
        return res.status(404).json({ message: "Not Found File" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  updateUser: async (req, res) => {
    // 1. 쿠키를 통해 받아온 토큰으로 유저 아이디를 만든다.
    const userId = req.userId;
    // 2. userId로 조회해서 유저 정보를 저장한다.
    try {
      const userInfo = await User.findOne({
        attributes: ["id", "email", "name", "socialType", "image"],
        where: { id: userId },
        raw: true,
      });
      // 3. req.body안에 이름과 패스워드가 있다면 두 가지를 업데이트한다.
      if (req.body) {
        const { name, password } = req.body;
        //google 로그인 인증 방식인 경우
        if (userInfo.socialType !== "local") {
          await User.update(
            {
              name,
            },
            { where: { id: userId } }
          );
        } else {
          //local 가입 방식인 경우
          const hashed = await bcrypt.hash(password, 10); // 비밀번호 수정 시 Hashing 해줄 것
          await User.update(
            {
              name,
              password: hashed,
            },
            { where: { id: userId } }
          );
        }
      }
      // 4. 업데이트된 유저정보를 res에 담아서 클라이언트로 보내준다.
      const updateUserInfo = await User.findOne({
        attributes: ["id", "email", "name", "socialType", "image"],
        where: { id: userId },
        raw: true,
      });

      if (updateUserInfo) {
        return res.status(200).json({ data: updateUserInfo });
      }
      return res.status(401).json({ message: "Unauthorized Request" });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  deleteUser: async (req, res) => {
    // 1. Cookie 를 이용해서 유저정보를 조회한 후, User.destroy 로 해당 DB를 삭제해준다.
    try {
      await User.destroy({ where: { id: req.userId } });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  checkToken: async (req, res) => {
    const token = generateAccessToken({ id: 1 });
    return sendAccessToken(res, token);
  },
};
