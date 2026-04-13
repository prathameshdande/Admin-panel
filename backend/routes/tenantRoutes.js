const express = require("express");
const router = express.Router();
const asyncHandler = require("../middleware/asyncHandler");
const tenantController = require("../controllers/tenantController");

router.get("/", asyncHandler(tenantController.getAllTenants));
router.post("/", asyncHandler(tenantController.createTenant));
router.delete("/:id", asyncHandler(tenantController.deleteTenant));

module.exports = router;
