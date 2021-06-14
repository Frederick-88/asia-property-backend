const UsersModel = require("../models/UsersModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerInputValidation } = require("../middleware/Validators");
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
      const url = "https://asia-property.herokuapp.com/";
      obj.image = url + req.file.path;
    }

    // Register Validation
    const errors = registerInputValidation(obj).errors;
    const isValid = registerInputValidation(obj).isValid;

    // if doesn't pass validation respond to client server with error details
    if (!isValid) {
      return res.status(422).json(errors);
    }

    UsersModel.find().then((user) => {
      // Username duplicate validator
      if (user.find((data) => data.username === obj.username)) {
        return res.status(422).json({
          status: "error",
          message: `${req.body.username} username already exist!`,
        });

        // Email duplicate validator
      } else if (user.find((data) => data.email === obj.email)) {
        return res.status(422).json({
          status: "error",
          message: `${req.body.email} email already exist!`,
        });

        // PhoneNumber duplicate validator
      } else if (user.find((data) => data.phone_number === obj.phone_number)) {
        return res.status(422).json({
          status: "error",
          message: `${req.body.phone_number} phone number already exist!`,
        });
      } else {
        UsersModel.create(obj)
          .then((response) => {
            res.status(200).json({
              status: "success",
              message: "Successfully created an account.",
              results: response,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
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
              const roleText = user.role === "admin" ? "Admin" : "User";

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
    UsersModel.find()
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: "Successfully get all users.",
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  getUserById: (req, res, next) => {
    const userId = req.params.userId;

    UsersModel.findById(userId)
      .then((response) => {
        res.status(200).json({
          status: "success",
          message: `Successfully get user data of ${response.username}.`,
          results: response,
        });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

  updateUserProfileById: (req, res, next) => {
    const userId = req.query.id;
    const tokenId = req.tokenId; // received/decoded id from token
    if (tokenId === userId) {
      UsersModel.findById(userId).then((selectedUser) => {
        const url = "https://asia-property.herokuapp.com/";
        // if request body not exist replace with the existing/old one
        const editObj = {
          username: req.body.username || selectedUser.username,
          email: req.body.email || selectedUser.email,
          phone_number: req.body.phone_number || selectedUser.phone_number,
          country: req.body.country || selectedUser.country,
          city: req.body.city || selectedUser.city,
        };
        if (req.file && req.file.path) {
          editObj.image = url + req.file.path;
        } else {
          editObj.image = selectedUser.image;
        }

        UsersModel.findByIdAndUpdate(
          userId,
          editObj,
          { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
        )
          .then((response) => {
            res.status(200).json({
              status: "success",
              message: `Successfully updated the data of ${selectedUser.username} .`,
              results: response,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      });
    } else {
      res.status(404).json({
        status: "error",
        message: "Demanded id not found.",
      });
    }
  },

  updateUserById: (req, res, next) => {
    const userId = req.query.id;

    UsersModel.findById(userId).then((selectedUser) => {
      const url = "https://asia-property.herokuapp.com/";
      // if request body not exist replace with the existing/old one
      const editObj = {
        username: req.body.username || selectedUser.username,
        email: req.body.email || selectedUser.email,
        phone_number: req.body.phone_number || selectedUser.phone_number,
        role: req.body.role || selectedUser.role,
        country: req.body.country || selectedUser.country,
        city: req.body.city || selectedUser.city,
      };
      if (req.file && req.file.path) {
        editObj.image = url + req.file.path;
      } else {
        editObj.image = selectedUser.image;
      }

      UsersModel.findByIdAndUpdate(
        userId,
        editObj,
        { new: true } // used when we use findByIdAndUpdate, to return the updated document instead of old one
      )
        .then((response) => {
          res.status(200).json({
            status: "success",
            message: `Successfully updated the data of ${selectedUser.username}.`,
            results: response,
          });
        })
        .catch((error) => {
          console.log(error);
          res.status(500).json(error);
        });
    });
  },

  deleteUserById: (req, res, next) => {
    const userId = req.query.id;
    UsersModel.findById(userId)
      .then((selectedUser) => {
        UsersModel.findByIdAndRemove(userId)
          .then(() => {
            res.status(200).json({
              status: "success",
              message: `Successfully deleted user of ${selectedUser.username}.`,
            });
          })
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },
};
