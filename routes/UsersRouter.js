var express = require("express");
var router = express.Router();
const UsersController = require("../controllers/UsersController");
const { validateAdmin, validateUser } = require("../middleware/AuthValidator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, res, callback) {
    callback(null, "./public/uploads/");
  },
  filename: function (req, file, callback) {
    const date = new Date().toISOString().slice(0, -5).replace("T", "--"); // format '2021-06-06T10:49:37.350Z' to '2021-06-06--11:11:00'
    callback(null, date + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});

router.post("/register", upload.single("image"), UsersController.register);
router.post("/login", UsersController.login);
router.get("/get", validateAdmin, UsersController.getAllUsers);
router.get("/get-by-id/:userId", validateAdmin, UsersController.getUserById);
router.put(
  "/update-user-profile",
  upload.single("image"),
  validateUser,
  UsersController.updateUserProfileById
);
router.put(
  "/update",
  upload.single("image"),
  validateAdmin,
  UsersController.updateUserById
);
router.delete("/delete", validateAdmin, UsersController.deleteUserById);

module.exports = router;
