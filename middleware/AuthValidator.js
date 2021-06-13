const jwt = require("jsonwebtoken");
require("dotenv").config();
const privateKey = process.env.PRIVATE_KEY;

module.exports.validateUser = (req, res, next) => {
  jwt.verify(req.headers["access-token"], privateKey, (err, decoded) => {
    if (err && err.expiredAt) {
      res.status(401).json({
        ...err,
        status: "error",
        message: "The token is expired. Try to login again.",
      });
    } else if (err) {
      res.status(401).json({
        ...err,
        status: "error",
        message: "Sorry, it seems you haven't login. Try login again.",
      });
    } else {
      req.tokenId = decoded.id; // pass token data (id) to any controller that need it.
      next();
    }
  });
};

module.exports.validateAdmin = (req, res, next) => {
  jwt.verify(req.headers["access-token"], privateKey, (err, decoded) => {
    if (err && err.expiredAt) {
      res.status(401).json({
        ...err,
        status: "error",
        message: "The token is expired. Try to login as admin again.",
      });
    } else if (!err && decoded && decoded.role == "admin") {
      req.tokenId = decoded.id; // pass token data (id) to any controller that need it.
      next();
    } else {
      res.status(401).json({
        ...err,
        status: "error",
        message: "Unauthenticated as an admin.",
      });
    }
  });
};
