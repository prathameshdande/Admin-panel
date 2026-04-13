const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const assignmentController = require("../controllers/assignmentController");

router.post("/", asyncHandler(assignmentController.createAssignment));

module.exports = router;
