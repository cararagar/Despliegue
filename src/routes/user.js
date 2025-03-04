const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { body } = require('express-validator');


// Validación y sanitización de entradas
router.post('/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 })
], userController.register);


router.post('/login', userController.login);


module.exports = router;
