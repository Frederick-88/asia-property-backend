var express = require("express");
var router = express.Router();
const RealEstatesController = require("../controllers/RealEstatesController");
const { validateAdmin } = require("../middleware/AuthValidator");

const multer = require("multer");

// ---
// old way to save in disk storage temporarily
// ---
// const storage = multer.diskStorage({
//   destination: function (req, res, callback) {
//     callback(null, "./public/uploads/");
//   },
//   filename: function (req, file, callback) {
//     const date = new Date().toISOString().slice(0, -5).replace("T", "--"); // format '2021-06-06T10:49:37.350Z' to '2021-06-06--11:11:00'
//     callback(null, date + "-" + file.originalname);
//   },
// });

// ---
// new way - to work with aws S3, so can get "buffer" field
// ---
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

// upload.array("images[]", 5) or upload.array(selector,fileLimit) means upload max 5 files with 'images[]' key. you can check more options on the multer docs or go to the circle_messenger_application backend ( on your github ).
// note: but still this 5 validation, means 5 files. It validates only at file uploads. if we put on request body, it won't detect
router.post(
  "/create",
  upload.array("images[]", 5),
  validateAdmin,
  RealEstatesController.createRealEstate
);
router.put(
  "/update",
  upload.array("images[]", 5),
  validateAdmin,
  RealEstatesController.updateRealEstateById
);
router.get("/get", RealEstatesController.getAllRealEstates);
router.get("/get-by-id/:realEstateId", RealEstatesController.getRealEstateById);
router.get("/get-inquiries", RealEstatesController.getFeaturedRealEstate);
router.get("/search", RealEstatesController.searchRealEstate);
router.delete(
  "/delete",
  validateAdmin,
  RealEstatesController.deleteRealEstateById
);

module.exports = router;
