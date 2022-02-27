const express = require('express');
const router = express.Router();
const dataControllers = require('../controllers/dataControllers');
const checkDataRight = require('../middlewaresAndHelpers/checkDataRight')

// [POST] /data/create (access_right: private)
router.post('/create', dataControllers.create);

// [PUT] /data/:id (access_right: private)
router.put('/:id', checkDataRight, dataControllers.update);

// [DELETE] /data/:id (access_right: private)
router.delete('/:id', checkDataRight, dataControllers.delete);

module.exports = router;
