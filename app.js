const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const indexRouter = require("./routes/index");
const UsersRouter = require("./routes/UsersRouter");
const AgentsRouter = require("./routes/AgentsRouter");
const RealEstatesRouter = require("./routes/RealEstatesRouter");
const FeaturedListsRouter = require("./routes/FeaturedListsRouter");

const app = express();

// to use local mongo database, need to run "sudo systemctl start mongod" in terminal to start the DB
// then can connect with compass. read mongoDB handbook in readme for further detail
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

// This is to make public users could access our pictures in the folder of uploads that we have created.
// needed to put inside /public ---> and make it static so people could access it.
// with url "http://localhost:8000/public/uploads/2021-06-11--14:08:20-clothe01.jpg""
app.use("/public", express.static("public"));
app.use("/public/uploads", express.static("public"));
// TODO : change multer file uploads name, with full url.

app.use("/", indexRouter);
app.use("/users", UsersRouter);
app.use("/agents", AgentsRouter);
app.use("/real-estate", RealEstatesRouter);
app.use("/featured-list", FeaturedListsRouter);

module.exports = app;
