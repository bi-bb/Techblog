const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/User");

// Generate JWT
const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
const ADMIN_EMAIL = process.env.ADMIN_EMAIL?.toLowerCase();

// Register
const registerUser = async (req, res) => {
  try {
    console.log("Register request body:", req.body);
    const { name, email, password } = req.body;
    console.log("Register request data:", { name, email, password });

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: email === process.env.ADMIN_EMAIL ? "admin" : "user",
    });
    console.log("User registered:", user);

    const token = generateToken(user._id, user.email, user.role);

    res.status(201).json({
      message: "Register success",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    console.log("Register success response sent");
  } catch (error) {
    console.error("Register error:", error);
    console.error("Register error details:", {
      message: error.message,
      stack: error.stack,
    });
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.email, user.role);

    res.json({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  token: generateToken(user._id),
});
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("Forgot password request email:", email);

    if (!email) {
      return res.status(400).json({ message: "Please enter your email" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpire = Date.now() + 3600000;
    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    console.log("Reset link:", resetLink);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "PENGUIN - Password Reset Request",
      html: `
        <h2>🐧 Penguin Password Rescue!</h2>

          <p>Oops… looks like you forgot your password.</p>

          <p>Do NOT worry — our penguin is here to help you 🐧✨</p>

         <p>Click the button below:</p>

          <a href="${resetLink}" 
            style="background:black;color:white;padding:10px 20px;
                    text-decoration:none;border-radius:8px;">
            Reset Password
          </a>

          <p>This link melts in 1 hour ❄️</p>

          <p>If you DID NOT request this, just ignore — penguin will quietly walk away 🐾</p>
      `,
    });

    console.log("Email sent successfully");

    return res.status(200).json({
      message: "Reset link sent successfully",
    });
  } catch (error) {
    console.error("Forgot password server error:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Please enter new password" });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpire = null;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Profile example
const getProfile = async (req, res) => {
  res.status(200).json({
    message: "Profile fetched successfully",
    user: req.user,
  });
};

// Admin example
const getAdminDashboard = async (req, res) => {
  res.status(200).json({
    message: "Welcome admin",
  });
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile,
  getAdminDashboard,
};