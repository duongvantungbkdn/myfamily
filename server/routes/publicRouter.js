const express = require('express');
const router = express.Router();
const publicControllers = require('../controllers/publicControllers');

// [GET] /contact (access_right: public)
router.get('/contact',publicControllers.contact);

// [GET] /news (access_right: public)
router.get('/news',publicControllers.news);

router.get('/configApp',publicControllers.configApp);

// [GET] / (access_right: public)
router.get('/', publicControllers.home);

module.exports = router;
