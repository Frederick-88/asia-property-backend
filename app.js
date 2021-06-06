const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
// const usersRouter = require("./routes/UsersRouter");
// const productRouter = require("./routes/ProductRouter");
// const orderRouter = require("./routes/OrderRouter");

const app = express();

const localURLMongoDB = process.env.LOCAL_MONGODB_URL;
// const onlineURLMongoDB = process.env.ONLINE_MONGODB_URL;

mongoose.connect(localURLMongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const databaseConnection = mongoose.connection;
databaseConnection.once("open", () => {
  console.log("Database connected:", localURLMongoDB);
});

databaseConnection.on("error", (err) => {
  console.error("connection error:", err);
});

mongoose.set("useCreateIndex", true);

app.use(cors());

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// This is to make public users could access our pictures in the folder of productImages that we have added.
// Harus mulai dari tahap pertama "/public" ---> dibuat static dan public sehingga bisa diakses di web.
// dengan url "http://localhost:8000/public/productImages/2020-06-20T10:44:44.152Z-defaultPicture.jpg"
app.use("/public", express.static("public"));
app.use("/public/uploads", express.static("public"));

app.use("/", indexRouter);
// app.use("/users", usersRouter);
// app.use("/product", productRouter);
// app.use("/order", orderRouter);

module.exports = app;
