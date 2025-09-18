 import User from '../model/userModel.js';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { genToken, genToken1 } from '../config/token.js';

// Register
export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existUser = await User.findOne({ email });
    if (existUser) return res.status(400).json({ message: "User already exists" });

    if (!validator.isEmail(email)) return res.status(400).json({ message: "Enter a valid email" });
    if (password.length < 8) return res.status(400).json({ message: "Password must be at least 8 characters" });

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });

    const token = genToken(user._id); // JWT

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user.toObject();
    return res.status(201).json(userData);
  } catch (err) {
    console.log("registration error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.password) return res.status(400).json({ message: "This account uses Google login only" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user.toObject();
    return res.status(200).json(userData);
  } catch (err) {
    console.log("login error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (err) {
    console.log("logout error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Google Login
export const googleLogin = async (req, res) => {
  try {
    const { name, email } = req.body;
    let user = await User.findOne({ email });

    if (!user) user = await User.create({ name, email, authProvider: "google" });

    const token = genToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password: _, ...userData } = user.toObject();
    return res.status(200).json(userData);
  } catch (err) {
    console.log("googleLogin error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Admin Login
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = genToken1(email); // separate token for admin

      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({ token });
    }

    return res.status(400).json({ message: "Invalid credentials" });
  } catch (err) {
    console.log("adminLogin error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
