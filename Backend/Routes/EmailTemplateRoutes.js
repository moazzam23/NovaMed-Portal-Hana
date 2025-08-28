const express = require("express");
const router = express.Router();
const userController = require("../Controllers/EmailTemplateController");

// Route paths
router.post("/email-templates", userController.createEmailTemplate);
router.get("/email-templates", userController.getEmailTemplates);
router.put("/email-templates/:id", userController.updateEmailTemplate);
router.post("/email_template/assign", userController.attachTemplateToCustomer);
router.get("/email_template/assign", userController.getCustomerTemplate);
router.get("/email-templates/:id", userController.getEmailTemplateById);
router.delete("/email-templates/:id", userController.deleteEmailTemplate);
router.get("/document-logs", userController.getlogs);

module.exports = router;
