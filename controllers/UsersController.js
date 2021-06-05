const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateRegisterInput = require("../middleware/RegisterValidator");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

module.exports = {
  register: (req, res, next) => {
    let obj = {
      username: req.body.username,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
      role: "user",
      country: req.body.country,
      city: req.body.city,
    };

    if (req.file && req.file.path) {
      obj.image = req.file.path;
    }

    // Register Validation
    const errors = validateRegisterInput(obj).errors;
    const isValid = validateRegisterInput(obj).isValid;

    // if doesn't pass validation respond to client server with error details
    if (!isValid) {
      return res.status(errors.status).json(errors);
    }

    UsersModel.find().then((user) => {
      console.log(user);
      // todo : move validators in register validator

      // Username duplicate validator
      if (user.find((data) => data.username === obj.username)) {
        return res.status(422).json({
          status: "error",
          message: `"${req.body.username}" username already exist!`,
        });

        // Email duplicate validator
      } else if (user.find((data) => data.email === obj.email)) {
        return res.status(422).json({
          status: "error",
          message: `"${req.body.email}" email already exist!`,
        });

        // PhoneNumber duplicate validator
      } else if (user.find((data) => data.phone_number === obj.phone_number)) {
        return res.status(422).json({
          status: "error",
          message: `"${req.body.phone_number}" phone number already exist!`,
        });
      } else {
        UsersModel.create(obj)
          .then((response) => {
            res.status(200).json({
              status: "success",
              message: "Successfully create account!",
              results: response,
            });
          })
          .catch((error) => res.status(500).json(error));
      }
    });
  },

  login: (req, res, next) => {
    const email = req.body.email;
    UsersModel.findOne({ email }).then((user) => {
      // check if user exists
      if (!user) {
        return res.status(404).json({
          status: "error",
          message: "Email not found",
        });
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const role = req.params.role;
          //  make payload so that when token is decoded in frontend this is the data that it will get
          const payload = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
          };

          jwt.sign(
            payload,
            privateKey,
            { expiresIn: "24h" }, // 1 day of expiration
            (err, token) => {
              const roleText = role === "admin" ? "Admin" : "User";

              res.status(200).json({
                status: "success",
                message: `Successfully Login as ${roleText}.`,
                token: token,
              });
            }
          );
        } else {
          return res.status(422).json({
            status: "error",
            error: "Incorrect password, please try again.",
          });
        }
      }
    });
  },

  getAllUsers: (req, res, next) => {
    UsersModel.find({})
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all users!",
          results: response,
        });
      })
      .catch((error) => res.status(500).json(error));
  },

  getUserById: (req, res, next) => {
    UsersModel.findById(req.params.userId)
      .then((response) => {
        console.log(response); // todo : change message with name

        res.status(200).json({
          status: "success",
          message: `Successfully get user data with id of ${req.params.userId}.`,
          results: response,
        });
      })
      .catch((error) => res.status(500).json(error));
  },

  updateUserById: (req, res, next) => {
    userId = req.params.userId;

    UsersModel.findById(userId).then((selectedUser) => {
      UsersModel.findByIdAndUpdate(
        userId,
        // if request body not exist replace with the existing/old one
        {
          image: (req.file && req.file.path) || selectedUser.image,
          username: req.body.username || selectedUser.username,
          email: req.body.email || selectedUser.email,
          phone_number: req.body.phone_number || selectedUser.phone_number,
          role: req.body.role || selectedUser.role,
          country: req.body.country || selectedUser.country,
          city: req.body.city || selectedUser.city,
        },
        { new: true } // used when we use findByIdAndUpdate, to return the edited document instead of old one
      )
        .then((response) => {
          console.log(response); // todo : change message with name

          res.status(200).json({
            status: "success",
            message: `Successfully edited the data of ${userId} .`,
            results: response,
          });
        })
        .catch((error) => res.status(500).json(error));
    });
  },

  deleteById: (req, res, next) => {
    UsersModel.findByIdAndRemove(req.params.userId)
      .then(() => {
        res.status(200).json({
          status: "success",
          message: `Successfully delete user with id of ${req.params.userId}.`,
        });
      })
      .catch((error) => res.status(500).json(error));
  },
};
