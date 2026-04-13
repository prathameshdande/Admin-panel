const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const flatController = require("../controllers/flatController");

router.get("/", asyncHandler(flatController.getAllFlats));
router.post("/", asyncHandler(flatController.createFlat));
router.delete("/:id", asyncHandler(flatController.deleteFlat));

module.exports = router;
