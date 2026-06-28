import jwt from "jsonwebtoken";
import { User } from "../models/UserModel.js";

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Please login first"
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;
    req.id = user._id;
    req.role = user.role;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default isAuthenticated;





// import jwt from "jsonwebtoken";

// const isAuthenticated = async (req, res, next) => {
//   try {
//     const token = req.cookies.token;

//     if (!token) {
//       return res.status(401).json({ success: false, message: "User not authenticated" });
//     }
//     const decode = await jwt.verify(token, process.env.SECRET_KEY)
//     if (!decode) {
//       return res.status(401).json({ success: false, message: "User not authenticated" });
//     }

//     req.id = decode.userId;
//     next();

//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }

// export default isAuthenticated;