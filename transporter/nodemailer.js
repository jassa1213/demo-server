const nodemailer = require("nodemailer");
const OTP = require("../models/otpModels");

// Function to send OTP via email
const send_otp = async (req, res) => {
  try {
    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "shopnestinfo2023@gmail.com",
        pass: "qmknzafruqchrats",
      },
    });

    // Extract user's email from the request body
    const user_email = req.body.email;

    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Check if an OTP already exists for the user's email
    let otpDocument = await OTP.findOne({ email: user_email });

    // If no OTP exists, create a new OTP document; otherwise, update the existing OTP 
    if (!otpDocument) {
      // If no OTP exists, create a new OTP document
      otpDocument = new OTP({
        email: user_email,
        otp: otp,
      });
    } else {
      // If an OTP exists, update it with the new OTP
      otpDocument.otp = otp;
    }


    // Save or update the OTP document in the database
    await otpDocument.save();

    // Email data
    const mailOptions = {
      from: "Shop Nest",
      to: user_email,
      subject: "🌟 Your Exclusive Shop Nest OTP is Ready! 🌟",
      text: `Hello there!\n\nYour exclusive Shop Nest OTP is ready for you:\n\n OTP Code: 🔐${otp}🔐\nThank you for choosing Shop Nest!`,
    };

    // Send OTP via email
    transporter.sendMail(mailOptions, (error, info) => {
      if (!error) {
        res.send(`OTP sent successfully ${info.response}`);
      } else {
        console.error(`Error sending OTP: ${error}`);
        res.status(500).message({error: "Error sending OTP"});
      }
    });
  } catch (error) {
    console.error(`Error saving/updating OTP in the database: ${error}`);
    res.status(500).send("Server error. Try again later");
  }
};

// Function to verify OTP
const verify_otp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const otpRecord = await OTP.findOne({ email, otp });

    // If OTP is matched, send a success response
    if (otpRecord) {
      res.json("OTP matched successfully!");
      next();
    } else {
      // If OTP is not matched, send an invalid OTP case
      res.json({ error: "Invalid OTP" });
    }
  } catch (error) {
    // If any other error occurs, handle it and send a Server error
    console.error(`Error verifying OTP: ${error.message}`);
    res.json({ error: error.message });
    next(error);
  }
};

// Export the functions
module.exports = { send_otp, verify_otp };
