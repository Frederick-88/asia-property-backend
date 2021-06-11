var express = require("express");
var router = express.Router();
const BookingListsController = require("../controllers/BookingListsController");
const { validateAdmin } = require("../middleware/AuthValidator");

// upload.single("image") means only upload 1 (image). you can check more options on the multer docs or go to the chat backend.
router.post("/create", validateAdmin, BookingListsController.createBookingList);
router.put(
  "/update",
  validateAdmin,
  BookingListsController.updateBookingListById
);
router.get("/get", validateAdmin, BookingListsController.getAllBookingLists);
router.get(
  "/get-by-id/:bookingListId",
  validateAdmin,
  BookingListsController.getBookingListById
);
router.delete(
  "/delete",
  validateAdmin,
  BookingListsController.deleteBookingListById
);

module.exports = router;
