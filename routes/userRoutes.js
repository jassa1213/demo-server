const express = require("express");
const {send_otp,verify_otp} = require("../transporter/nodemailer");
const {registerUser,loginUser, changePassword,forgotPassword,updateUser,getUser} = require("../controllers/userController")
const {verifyToken} = require("../middleware/authMiddleware");
const router= express.Router();
router.post("/send-otp",send_otp)
router.post("/verify-otp",verify_otp)
router.post("/register-user",registerUser)
router.post("/login-user",loginUser)
router.get("/get-user",verifyToken,getUser)
router.post("/update-user/:id",verifyToken,updateUser)
router.post("/change-password",verifyToken, changePassword)
router.post("/reset-password",verifyToken, forgotPassword)
module.exports = router