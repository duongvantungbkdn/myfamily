const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');

// POST /user/auth/login
router.post('/auth/login', userControllers.login);

//[POST] /user/auth/register
router.post('/auth/register', userControllers.auth);

// PUT /user/changeUsername
router.put('/changeUsername', userControllers.changeUsername);

// PUT /user/changePassword
router.put('/changePassword', userControllers.changePassword);

module.exports = router;
