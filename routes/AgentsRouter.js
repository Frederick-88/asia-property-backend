var express = require("express");
var router = express.Router();
const AgentsController = require("../controllers/AgentsController");
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

// upload.single("image") means only upload 1 (image). you can check more options on the multer docs or go to the chat backend.
router.post(
  "/create",
  validateAdmin,
  upload.single("image"),
  AgentsController.createAgent
);
router.put(
  "/update",
  validateAdmin,
  upload.single("image"),
  AgentsController.updateAgentById
);
router.get("/get", AgentsController.getAllAgents);
router.get("/get-by-id/:agentId", AgentsController.getAgentById);
router.delete("/delete", validateAdmin, AgentsController.deleteAgentById);

module.exports = router;
