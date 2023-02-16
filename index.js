const express = require("express");
const app = express();
const cros = require("cors");
const mongoose = require("mongoose");
const donte = require("dotenv").config();
const router = require("./routers/index");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const MongoDbStore = require("connect-mongodb-session")(session);

app.use(express.json());
app.use(cookieParser());
const store = new MongoDbStore({
  uri: process.env.MONGODB_URL,
  collection: "sessions",
});

app.use(
  cros({
    origin: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: "lax",
      secure: false,
      maxAge: 86400000,
    },
    store: store,
  })
);

//router
app.use("/", (req, res, next) => {
  res.send("hello word");
});

const port = process.env.PORT || 5000;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    const server = app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
    const io = require("./utils/socket").init(server);
    io.on("connection", (socket) => {
      console.log("connected socket", socket.id);

      socket.on("send_message", (data) => {
        console.log(data);
        console.log(data.name + ":" + data.message);
        io.emit("receive_message", data);
      });
      socket.on("disconnect", () => {
        console.log("disconnected socket", socket.id);
      });
    });
  })
  .catch((err) => console.log(err));
