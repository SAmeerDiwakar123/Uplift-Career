import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connection failed:", error.message);
    // ✅ process.exit(1) hata diya — Vercel crash ho jaata tha
    throw error;
  }
};

export default ConnectDB;








// import mongoose from "mongoose";

// const ConnectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI);
//     console.log("DB Connected");
//   } catch (error) {
//     console.log("DB connection failed ",error.message);
//     process.exit(1);
//   }
// }

// export default ConnectDB;