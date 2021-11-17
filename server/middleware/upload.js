const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().valueOf() + path.extname(file.originalname)); // 타임 스템프로 중복되는 이름이 저장 가능하게 함.
  },
});

exports.uploads = multer({ storage: storage });

// const multerS3 = require("multer-s3");
// const AWS = require("aws-sdk");
// const upload = multer({
//   dest: "uploads/",
//   limits: { fileSize: 5 * 500 * 500 },
// });
// const dotenv = require("dotenv");
// dotenv.config();

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/");
//     },
//     filename: function (req, file, cb) {
//       cb(null, new Date().valueOf() + path.extname(file.originalname)); // 타임 스템프로 중복되는 이름이 저장 가능하게 함.
//     },
//   }),
// });

// const s3 = new AWS.S3({
//   accessKeyId: process.env.S3_KEY_ID,
//   secretAccessKey: process.env.S3_SECRET_KEY,
//   region: process.env.S3_REGION,
// });

// const storage = multerS3({
//   s3: s3,
//   bucket: process.env.S3_BUCKET_NAME,
//   contentType: multerS3.AUTO_CONTENT_TYPE,
//   acl: "public-read-write",
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     cb(null, `uploads/${Date.now()}_${file.originalname}`);
//   },
// });
