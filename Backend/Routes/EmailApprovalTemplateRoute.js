const express = require('express');
const router = express.Router();
const EmailApprovalTemplateController = require('../Controllers/EmailApprovalTemplateController');

// Route paths
router.post('/email-approval', EmailApprovalTemplateController.createApprovalTemplate);
router.get('/email-approval', EmailApprovalTemplateController.getApprovalTemplates);
router.put('/email-approval/:id', EmailApprovalTemplateController.updateApprovalTemplate);
router.patch('/email-approval/:id/status', EmailApprovalTemplateController.updateApprovalTemplateStatus);
router.get('/email-approval/:id', EmailApprovalTemplateController.getApprovalTemplateById);
router.delete('/email-approval/:id', EmailApprovalTemplateController.deleteApprovalTemplate);


module.exports = router;