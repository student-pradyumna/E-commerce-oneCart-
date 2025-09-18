 
import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
  try {
    const { token } = req.cookies; // get token from browser cookies
    

    if (!token) {
      return res.status(401).json({ message: "Not Authorized. Login Again." });
    }

    let verifyToken;
    try {
      verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ message: "Invalid token. Login Again." });
    }

    // Check if token email matches admin email
    if (verifyToken.email !== process.env.ADMIN_EMAIL) {
      return res.status(403).json({ message: "Forbidden. Admin only." });
    }

    req.adminEmail = verifyToken.email; // pass admin info to next
    next();
  } catch (err) {
    console.log('AdminAuth error:', err);
    return res.status(500).json({ message: `AdminAuth error ${err}` });
  }
};

export default adminAuth;
