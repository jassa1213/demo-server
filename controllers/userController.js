const User = require("../models/userModels");
const bcrypt = require("bcrypt");
const { generateTokenForUser } = require("../token/generateToken");

const registerUser = async (req, res) => {
  try {
    // Hash the user's password before saving it to the database
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 salt rounds

    const newUser = new User({
      email: req.body.email,
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

    const token = generateTokenForUser(newUser._id, newUser.role);
    newUser.token = token;
    await newUser.save();
    console.log(newUser);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid email" }); // Example error response

    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Include the user's role here
    const token = generateTokenForUser(user._id);

    return res.status(200).json({
      message: user,
      token: token,
    });
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};


const changePassword = async (req, res) => {
  const { email, currentPassword, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Verify the current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
      
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10); // Use the same salt rounds as during registration

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email, resetPassword } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(resetPassword, 10); // Use the same salt rounds as during registration

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error reseting password:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id; // Assuming you have user authentication middleware

  try {
    // Find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user information based on request data
    if (req.body.fullName) {
      user.fullName = req.body.fullName;
    }
    if (req.body.phoneNumber) {
      user.phoneNumber = req.body.phoneNumber;
    }
    if (req.body.gender) {
      user.gender = req.body.gender;
    }
    if (req.body.occupation) {
      user.occupation = req.body.occupation;
    }
    if (req.body.pincode) {
      user.pincode = req.body.pincode;
    }
    if (req.body.address) {
      if (req.body.address.landmark) {
        user.address.landmark = req.body.address.landmark;
      }
      if (req.body.address.city) {
        user.address.city = req.body.address.city;
      }
      if (req.body.address.state) {
        user.address.state = req.body.address.state;
      }
    }

    // Save the updated user data
    await user.save();

    res.json({ message: "User updated successfully" });
  } catch (error) {
    console.error("Error updating user :", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  const users = await User.find();
  res.send(users);
};


module.exports = {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  updateUser,
  getUser
};
