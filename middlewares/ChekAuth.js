import jwt from "jsonwebtoken";

export const CheckAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: "User is not authorized" });
      return;
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ message: "User is not authorized" });
      return;
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "User is not authorized" });
  }
};