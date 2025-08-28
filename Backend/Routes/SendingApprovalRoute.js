const express = require('express');
const router = express.Router();
const approvalController = require('../Controllers/SendingApprovalcontroller');

router.post('/approval', approvalController.createApprovalRequest);
router.get('/approval', approvalController.getApprovalRequests);
router.get('/approval/pending', approvalController.getPendingApprovalRequests);
router.post('/approval/approve', approvalController.approveRequest);
router.post('/approval/reject', approvalController.rejectRequest);


module.exports = router;