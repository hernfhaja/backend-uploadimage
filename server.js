let express = require("express");
let app = express();
let bodyParser = require("body-parser");

require("dotenv").config();

const cors = require("cors");
const { excuteQuery } = require("./src/config/dbConnetion.ts");

var server_port = process.env.YOUR_PORT || process.env.PORT || 5000;
var server_host = process.env.YOUR_HOST || "0.0.0.0";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extends: true }));

//homepage route
app.get("/", async (req, res) => {
  const sql = "select * from users";
  const data = await excuteQuery(sql, []);

  return res.status(200).send(data.rows);
});

app.post("/", async (req, res) => {
  const sql = `insert into users(  sendername , name , timestamp) values (  '${req.body.sendername}' , '${req.body.name}' , current_timestamp )`;
  const data = await excuteQuery(sql, []);

  return res.status(200).send("insert Success");
});

//listen port
try {
  await server.listen(server_port, server_host);
  server.blipp();
} catch (err) {
  server.log.error(err);
  process.exit(1);
}
