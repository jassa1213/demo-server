const express = require('express');
const router = express.Router();
const { uploadImage } = require('./cloudinaryController');

// Define a route for image uploads
router.post('/upload-image', uploadImage);

module.exports = router;
