const express = require('express');
const router = express.Router();
const controller = require('../Controllers/DocumentSequenceController');

// Get next document number and increment
router.get('/next/:documentType', controller.getNextDocumentNumber);

// Create a new document sequence
router.post('/', controller.createDocumentSequence);

// Get all document sequences
router.get('/', controller.getAllSequences);

// Get a specific document sequence by ID
router.get('/:id', controller.getDocumentSequenceById);

// Update a document sequence by ID
router.put('/:id', controller.updateDocumentSequence);

module.exports = router;