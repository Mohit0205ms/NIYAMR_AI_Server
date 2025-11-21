const express = require('express');
const pdfController = require('../controllers/pdfController');
const upload = require('../middlewares/upload.js');

const router = express.Router();

router.post('/evaluate-pdf', upload.single('pdf'), pdfController.evaluatePdf);

module.exports = router;
