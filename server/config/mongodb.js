import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("DB Connected");
  } catch (error) {
    console.log("DB connection failed ",error.message);
    process.exit(1);
  }
}

// const ConnectDB = async () => {
//   mongoose.connection.on('connected', () => console.log('DB connected'));

//   await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`)
// }
export default ConnectDB;