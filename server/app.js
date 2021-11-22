const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const usersRouter = require("./router/users");
const palettesRouter = require("./router/palettes");
const authRouter = require("./router/auth");
const likesRouter = require("./router/like");
const tagsRouter = require("./router/tags");
const models = require("./models");
// const sequelize = require("./models").sequelize;
// sequelize.sync();

const app = express();
const port = 4000;

app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    Headers: { "content-type": "application/json" },
  })
);
app.use(morgan("tiny"));

app.use("/users", usersRouter);
app.use("/palettes", palettesRouter);
app.use("/likes", likesRouter);
app.use("/auth", authRouter);
app.use("/tags", tagsRouter);

models.sequelize.sync({ force: false }).then(() => {
  console.log("success models sync");
});

app.get("/", (req, res) => {
  res.status(201).send("Welcome to Colorboration Server");
});

app.listen(port, () => {
  console.log(`Server started on Port ${port}.`);
});
