 
 import User from "../model/userModel.js";

// Get current logged-in user
export const getCurrentUser = async (req, res) => {
  try {
    if (!req.userId) return res.status(401).json({ message: "Unauthorized: No user ID" });

    const user = await User.findById(req.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json(user);
  } catch (err) {
    console.log("getCurrentUser error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Get admin
export const getAdmin = async (req, res) => {
  try {
    if (!req.adminEmail) return res.status(404).json({ message: "Admin not found" });

    return res.status(200).json({ email: req.adminEmail, role: "admin" });
  } catch (err) {
    console.log("getAdmin error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};
