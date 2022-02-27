const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');

router.get('/usersList', adminControllers.usersWithDeletedList);

router.post('/setConfigApp', adminControllers.setConfigApp);

router.put('/updateConfigApp', adminControllers.updateConfigApp);

router.put('/updateUserRole', adminControllers.updateUserRole);

router.delete('/user/:id', adminControllers.lockUser);

router.patch('/user/:id', adminControllers.restoreUser);

router.delete('/user/remove/:id', adminControllers.removeUser);

router.patch('/data/:id', adminControllers.restoreData);

router.delete('/data/:id', adminControllers.removeData);



module.exports = router;
