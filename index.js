let express = require("express");
let app = express();
let bodyParser = require("body-parser");

// require("dotenv").config();

const cors = require("cors");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});

const { excuteQuery } = require("./src/config/dbConnetion.ts");

let PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

//homepage route
app.get("/", async (req, res) => {
  const sql = "select * from users";
  const data = await excuteQuery(sql, []);

  return res.status(200).send(data.rows);
});

app.post("/", async (req, res) => {
  const sql = `insert into users(  sendername , name ,imgurl, timestamp) values (  '${req.body.sendername}' , '${req.body.name}', '${req.body.imgurl}' , current_timestamp )`;
  const data = await excuteQuery(sql, []);

  return res.status(200).send("insert Success");
});

//listen port

app.listen(PORT, () => {
  console.log("Server start");
});
