const express = require('express');
const router = express.Router();
const roleController = require('../Controllers/RoleController');

router.get('/roles', roleController.getAllRoles);
router.get('/roles/:id', roleController.getRoleById);
router.post('/roles', roleController.createRole);
router.put('/roles/:id', roleController.updateRole);
router.delete('/roles/:id', roleController.deleteRole);
router.post('/roles/:id/permissions', roleController.addPermissions);
router.put('/roles/:id/permissions', roleController.updatePermissions);
router.get('/roles/:id/permissions', roleController.getROLEPERMISSIONS);
router.get('/permissions', roleController.getAllPermissions);
router.get("/dashboard/roles", roleController.getRolesSummary);

module.exports = router;