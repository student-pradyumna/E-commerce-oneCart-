 
import jwt from 'jsonwebtoken';

export const genToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "9d" });
    return token;
  } catch (err) {
    console.error("JWT generation error:", err.message);
  }
};

export const genToken1 = (email) => {
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
    return token;
  } catch (err) {
    console.error("JWT generation error:", err.message);
  }
};
