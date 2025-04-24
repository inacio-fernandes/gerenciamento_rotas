const express = require('express');
const router = express.Router(); 
const loginController = require('../controllers/loginController');

router.post('/signup', loginController.signup);
router.post('/login', loginController.login);


module.exports = router;
