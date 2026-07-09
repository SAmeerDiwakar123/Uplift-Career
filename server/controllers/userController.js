import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

// Register a new user

const registerUser = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;
    // Check All fields are full 
    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Profile photo is required"
      });
    }

    const fileUri = getDataUri(file);
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: cloudResponse.secure_url,

      }
    })

    return res.status(201).json({ success: true, message: "User registered successfully" });

  } catch (error) {
    console.log(error);
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    // Check All fields are full
    if (!email || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    // Check if password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // check role is correct or not 
    if (role !== user.role) {
      return res.status(400).json({ success: false, message: "Invalid role" });
    }

    const tokenData = {
      userId: user._id,
    }
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    return res.status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error, try again" });
  }
}

const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true
    })
  } catch (error) {
    console.log(error);
  }
}
const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;

    const file = req.file;
    let cloudResponse;

    // ✅ sirf tab upload karo jab file ho
    if (file) {
      const fileUri = getDataUri(file);
      cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
        resource_type: "raw"
      });
    }

    let skillsArray;
    if (skills) skillsArray = skills.split(",");

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ success: false, message: "User not found" });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // ✅ sirf tab resume update karo jab file ho
    if (cloudResponse) {
      user.profile.resume = cloudResponse.secure_url;
      user.profile.resumeOriginalName = file.originalname;
    }

    await user.save();

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    }

    return res.status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: true,
        sameSite: "none"
      })
      .json({
        message: "Logged out successfully",
        success: true
      });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}


const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        {
          id: "admin",
          role: "admin",
          email
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      )

      res.json({ success: true, token })
    } else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}
export { registerUser, loginUser, logout, updateProfile, adminLogin }; 