var express = require("express");
var router = express.Router();
const RealEstatesController = require("../controllers/RealEstatesController");
const { validateAdmin } = require("../middleware/AuthValidator");

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

// upload.array("images[]", 3) or upload.array(selector,fileLimit) means upload max 3 files with 'images[]' key. you can check more options on the multer docs or go to the chat backend.
router.post(
  "/create",
  upload.array("images[]", 3),
  validateAdmin,
  RealEstatesController.createRealEstate
);
router.put(
  "/update",
  upload.array("images[]", 3),
  validateAdmin,
  RealEstatesController.updateRealEstateById
);
router.get("/get", RealEstatesController.getAllRealEstates);
router.get("/get-by-id/:realEstateId", RealEstatesController.getRealEstateById);
router.delete(
  "/delete",
  validateAdmin,
  RealEstatesController.deleteRealEstateById
);

module.exports = router;
