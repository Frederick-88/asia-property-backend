var express = require("express");
var router = express.Router();
const FeaturedListsController = require("../controllers/FeaturedListsController");
const { validateAdmin } = require("../middleware/AuthValidator");

router.post(
  "/create",
  validateAdmin,
  FeaturedListsController.createFeaturedList
);
router.put(
  "/update",
  validateAdmin,
  FeaturedListsController.updateFeaturedListById
);
router.get("/get", FeaturedListsController.getAllFeaturedLists);
router.get(
  "/get-by-id/:featuredListId",
  validateAdmin,
  FeaturedListsController.getFeaturedListById
);
router.delete("/delete", FeaturedListsController.deleteFeaturedListById);

module.exports = router;
