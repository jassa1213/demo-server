const express = require('express');
const router = express.Router();
const { registerSeller,loginSeller, changePassword, resetPassword, updateSeller, getSeller } = require('../controllers/sellerController'); 
const { verifyToken } = require('../middleware/authMiddleware');
const isSeller = require('../middleware/isSellerMiddleware');
router.post('/register-seller', registerSeller);
router.post('/login-seller', loginSeller);-
router.post('/change-password',verifyToken, changePassword);
router.post('/reset-password',verifyToken, resetPassword);
router.post('/update-seller/:id',verifyToken, updateSeller);
router.get('/get-seller',verifyToken, isSeller,getSeller);

module.exports = router;