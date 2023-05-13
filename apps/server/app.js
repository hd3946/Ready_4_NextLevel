const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
//const cookieParser = require("cookie-parser");
const logger = require("morgan");
// const dotenv = require("dotenv").config();
// if (dotenv.error) throw dotenv.error;
require("better-module-alias")(__dirname);
// const { sequelize } = require("#src/models");
// const routes = require("#src/routes"); 

// const db = require("#src/process/db.process")

app.set("port", process.env.SERVER_PORT || 4500);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());

const corsOption = {
  origin: "http://localhost:4000",
  methods: "POST,GET",
  credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
  optionsSuccessStatus: 200,
}; 

app.use(cors(corsOption));

// sequelize
//   .sync({ alter: false }) // force:true 일경우 테이블 전부 지우고 새로 설정~!  alter
//   //.authenticate ()
//   .then(() => {
//     console.log("데이터베이스 연결 성공");
//     console.log(
//       `✅ Server running on http://localhost:${app.get("port")}/api-docs`
//     );
//   })
//   .catch((err) => {
//     console.error(err);
//   });
 
// app.use("/", routes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  return res.status(400).send("Something broke!");
});

app.use((req, res, next) => {
  return res.status(404).send("invalid path");
});

app.listen(app.get("port"), () => {
  console.log(`✅ Server running on http://localhost:${app.get('port')}`);
});

// const init_DB = async () => {
//   let result = await db.initUser(process.env.SERVER_ACCOUNT, "1234", "Crazy", "")
//   console.log(result);
//   result = await db.initClub(process.env.SERVER_ACCOUNT, "Crazy Club", "https://image.bugsm.co.kr/album/images/500/3141/314174.jpg")
//   console.log(result);
//   result = await db.initForum()
//   console.log(result);
// }

// init_DB();

module.exports = app;
