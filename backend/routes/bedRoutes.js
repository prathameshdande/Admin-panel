const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const bedController = require("../controllers/bedController");

router.get("/", asyncHandler(bedController.getAllBeds));
router.post("/", asyncHandler(bedController.createBed));
router.patch("/:id/status", asyncHandler(bedController.updateBedStatus));

module.exports = router;
