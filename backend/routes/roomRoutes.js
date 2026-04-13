const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const roomController = require("../controllers/roomController");

router.get("/", asyncHandler(roomController.getAllRooms));
router.post("/", asyncHandler(roomController.createRoom));

module.exports = router;
