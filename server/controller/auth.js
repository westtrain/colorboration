const { User } = require("../models");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const {
  generateAccessToken,
  sendAccessToken,
} = require("./tokenFunction/index");
const { emit } = require("nodemon");

module.exports = {
  login: async (req, res) => {
    // 1. email과 password 를 클라이언트에서 받아온다.
    const { email, password } = req.body;
    // console.log(req);
    // 2. User 테이블에서 유저정보를 찾는다
    const userInfo = await User.findOne({ where: { email } });
    try {
      // 3. 유저정보가 없거나, 비밀번호가 틀릴경우 401 코드와 함께 오류 메시지를 보내준다.
      if (
        !userInfo ||
        !bcrypt.compareSync(password, userInfo.dataValues.password)
      ) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      // 4. 유저정보가 있으면 유저 테이블에서 정보를가져와서 res에 담아서 토큰과함께 클라이언트로 보내준다.
      const loginUserInfo = await User.findOne({
        attributes: ["id", "email", "name", "socialType", "image"],
        where: { email },
        raw: true,
      });
      const { id, userEmail, name, socialType } = loginUserInfo;
      const token = generateAccessToken({
        id,
        userEmail,
        name,
        socialType,
        //image,
      });
      return res
        .status(200)
        .cookie("jwt", token, {
          sameSite: "None",
          secure: true,
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
          // domain: ".color-boration.tk",
          domain: "localhost",
        })
        .json({ token, data: loginUserInfo });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  logout: async (req, res) => {
    // 1. Cookie 삭제
    try {
      res.clearCookie("jwt");
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  signup: async (req, res) => {
    // 1. email, name, password를 클라이언트에서 받아온다.
    const { email, name, password } = req.body;

    // 2. 패스워드를 hashing 해준 후 DB에 저장한다.
    // 3. User.create 를 사용해서 유저정보를 DB에 저장한다.
    try {
      if (req.file) {
        const hashed = await bcrypt.hash(password, 10);
        await User.create({
          email,
          name,
          password: hashed,
          socialType: "local",
          image: "",
        });
        return res.status(200).json({ image: req.file.location });
      }
      const hashed = await bcrypt.hash(password, 10);
      await User.create({
        email,
        name,
        password: hashed,
        socialType: "local",
        image: "default.jpg",
      });
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.sendStatus(500);
    }
  },
  validateName: async (req, res) => {
    // 1. Name 을 클라이언트에서 받아온 후, DB에 저장되어있는지 확인.
    const { name } = req.body;
    const foundName = await User.findOne({ where: { name } });
    try {
      // 2. 저장되어있다면 오류메시지를 보내준다.
      if (foundName) {
        return res.status(409).json({ message: "Name already exists" });
      }
      // 3. 저장되어있지않으면 OK 메시지
      return res.sendStatus(200);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Server Error" });
    }
  },
  googleLogin: async (req, res) => {
    return res.redirect(
      // 구글 로그인 화면 리다이렉트
      `https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/userinfo.email+https://www.googleapis.com/auth/userinfo.profile&access_type=offline&response_type=code&state=state_parameter_passthrough_value&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&client_id=${process.env.GOOGLE_CLIENT_ID}`
    );
  },
  googleCallback: async (req, res) => {
    const code = req.query.code; // authorization code
    try {
      const result = await axios.post(
        // authorization code를 이용해서 access token 요청
        `https://oauth2.googleapis.com/token?code=${code}&client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&redirect_uri=${process.env.GOOGLE_REDIRECT_URI}&grant_type=authorization_code`
      );
      const userInfo = await axios.get(
        // access token으로 유저정보 요청

        `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${result.data.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${result.data.access_token}`,
          },
        }
      );
      const user = await User.findOrCreate({
        where: {
          email: userInfo.data.email,
          socialType: "google",
        },
        defaults: {
          email: userInfo.data.email,
          name: userInfo.data.name,
          password: "",
          socialType: "google",
          image: userInfo.data.picture,
        },
      });

      const token = generateAccessToken({
        id: user[0].dataValues.id,
        email: user[0].dataValues.email,
        name: user[0].dataValues.name,
        socialType: user[0].dataValues.socialType,
        image: user[0].dataValues.image,
      });

      res.cookie("jwt", token, {
        sameSite: "None",
        secure: true,
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
        domain: ".color-boration.tk",
      });

      res.redirect(`${process.env.CLIENT_URI}/temp`);
    } catch (error) {
      res.sendStatus(500);
    }
  },
};
