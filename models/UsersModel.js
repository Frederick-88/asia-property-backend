const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 8;

const UsersModel = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default:
        `${process.env.API_URL}/public/images/default-user.png`,
    },
  },
  {
    timestamps: {
      updatedAt: "updated_at",
      createdAt: "created_at",
    },
  }
);
UsersModel.pre("save", function (next) {
  this.password = bcrypt.hashSync(this.password, saltRounds);
  this.updated_at = Date.now(); // update updated_at everytime changed
  next();
});
module.exports = mongoose.model("Users", UsersModel); // export as 'Users' collection name
