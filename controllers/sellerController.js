const Seller = require("../models/sellerModels");
const bcrypt = require("bcrypt");
const { generateTokenForSeller } = require("../token/generateToken");

const registerSeller = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    // Create a new seller document
    const newSeller = new Seller({
      email: req.body.email,
      username: req.body.username,
      fullName: req.body.fullName,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      password: hashedPassword,
      occupation: req.body.occupation,
      pincode: req.body.pincode,
      landmark: req.body.landmark,
      country: req.body.country,
      state: req.body.state,
    });

    // await newSeller.save();

    res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    console.error("Error registering seller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginSeller = async (req, res) => {
  try {
    const { username, password } = req.body;

    const seller = await Seller.findOne({ username });

    if (!seller) {
      return res.status(401).json({ error: "Seller not found" });
    }

    const passwordMatch = await bcrypt.compare(password, seller.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const token = generateTokenForSeller(seller._id);
    res.status(200).json({
      message: "User logged in successfully!",
      seller: seller,
      token: token,
    });
  } catch (error) {
    console.error("Error logging in seller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const changePassword = async (req, res) => {
  try {
    // Extract seller credentials from the request body
    const { username, currentPassword, newPassword } = req.body;

    // Find the seller by username
    const seller = await Seller.findOne({ username });

    if (!seller) {
      return res.status(401).json({ error: "Seller not found" });
    }

    // Verify the current password
    const passwordMatch = await bcrypt.compare(
      currentPassword,
      seller.password
    );

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid current password" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

    // Update the seller's password in the database
    seller.password = hashedNewPassword;
    await seller.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing seller password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const resetPassword = async (req, res) => {
  try {
    // Extract seller credentials from the request body
    const { username, newPassword } = req.body;

    // Find the seller by username
    const seller = await Seller.findOne({ username });

    if (!seller) {
      return res.status(401).json({ error: "Seller not found" });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10); // 10 is the salt rounds

    // Update the seller's password in the database
    seller.password = hashedNewPassword;
    await seller.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting seller password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateSeller = async (req, res) => {
  const sellerId = req.params.id;
  try {
    const seller = await Seller.findById(sellerId);

    if (!seller) {
      return res.status(404).json({ error: "Seller not found" });
    }

    if (req.body.fullName) {
      seller.fullName = req.body.fullName;
    }
    if (req.body.username) {
      seller.username = req.body.username;
    }
    if (req.body.phoneNumber) {
      seller.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.gender) {
      seller.gender = req.body.gender;
    }
    if (req.body.occupation) {
      seller.occupation = req.body.occupation;
    }
    if (req.body.pincode) {
      seller.pincode = req.body.pincode;
    }
    if (req.body.address) {
      if (req.body.address.landmark) {
        seller.address.landmark = req.body.address.landmark;
      }
      if (req.body.address.city) {
        seller.address.city = req.body.address.city;
      }
      if (req.body.address.state) {
        seller.address.state = req.body.address.state;
      }
    }

    await seller.save();

    res.status(200).json({ message: "Seller updated successfully" });
  } catch (error) {
    console.error("Error updating seller :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getSeller = async (req, res) => {
  const sellers = await Seller.find();
  res.send(sellers);
};

module.exports = {
  registerSeller,
  loginSeller,
  changePassword,
  resetPassword,
  updateSeller,
  getSeller,
};
