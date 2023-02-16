const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(cors());

app.use("/api", (req, res, next) => {
  res.send("hello word");
});

app.listen(process.env.port, () => {
  console.log("SERVER IS RUNNING");
});
