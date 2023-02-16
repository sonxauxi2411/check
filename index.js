const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");

app.use(
  cros({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use("/api", (req, res, next) => {
  res.send("hello word");
});

app.listen(process.env.port, () => {
  console.log("SERVER IS RUNNING");
});
