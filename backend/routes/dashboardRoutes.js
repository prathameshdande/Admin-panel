const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const dashboardController = require("../controllers/dashboardController");

router.get("/", asyncHandler(dashboardController.getDashboard));

module.exports = router;
