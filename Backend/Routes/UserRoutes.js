const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UsersController');

// Route paths
router.post('/users', userController.createUser);
router.get('/users', userController.getuser);
router.put('/users/:id', userController.updateUser);
router.get('/users/next-id', userController.getNextUserId);
router.get('/users/:id', userController.getUserById);
router.delete('/users/:id', userController.deleteUser);


module.exports = router;