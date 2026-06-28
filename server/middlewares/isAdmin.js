import jwt from "jsonwebtoken";

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Check karo role "admin" hai ya nahi
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    req.id = decoded.id;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

export default isAdmin;