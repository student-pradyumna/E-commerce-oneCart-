 import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ message: "No token provided" });

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    if (!verifyToken) return res.status(401).json({ message: "Invalid token" });

    req.userId = verifyToken.userId; // must match token payload
    next();
  } catch (err) {
    console.log("isAuth error:", err.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default isAuth;
