var express = require("express");
var router = express.Router();
const WishlistsController = require("../controllers/WishlistsController");
const { validateUser, validateAdmin } = require("../middleware/AuthValidator");

router.post("/create", validateUser, WishlistsController.createWishlist);
router.get("/get", validateAdmin, WishlistsController.getAllWishlists);
router.get(
  "/get-by-user-id/:userId",
  validateUser,
  WishlistsController.getWishlistByUserId
);
router.delete("/delete", validateUser, WishlistsController.deleteWishlistById);

module.exports = router;
