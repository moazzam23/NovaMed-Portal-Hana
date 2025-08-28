const express = require('express');
const router = express.Router();
const controller = require('../Controllers/ReceipientEmailsController');

router.post('/', controller.createRecipient);
router.get('/', controller.getAllRecipients);
router.get('/:id', controller.getRecipientById);
router.put('/:id', controller.updateRecipient);
router.delete('/:id', controller.deleteRecipient);

module.exports = router;