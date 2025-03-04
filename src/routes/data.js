const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { body } = require('express-validator');


router.post('/upload', [
    body('dataField').notEmpty().trim().escape()
], dataController.uploadData);


module.exports = router;
