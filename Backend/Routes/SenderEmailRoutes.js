
const express = require("express");
const router = express.Router();
const emailSetupController = require("../Controllers/SenderEmailController");

router.get("/", emailSetupController.getAll);
router.get("/:id", emailSetupController.getById);
router.post("/", emailSetupController.create);
router.put("/:id", emailSetupController.update);

module.exports = router;