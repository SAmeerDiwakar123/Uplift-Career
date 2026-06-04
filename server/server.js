import express from "express";
import cors from "cors";
import "dotenv/config";
import ConnectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoute.js";
import cookieParser from "cookie-parser";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import dns from "dns";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

// DNS config
dns.setServers(["1.1.1.1", "8.8.8.8"]);

// Initialize app FIRST
const app = express();

// Security middlewares FIRST
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (IMPORTANT FIX HERE)
app.use(
  cors({
    origin: "https://uplift-career-whfy.vercel.app", 
    credentials: true,
  })
);

// Connect DB
await ConnectDB();

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import ConnectDB from './config/mongodb.js';
// import userRoute from './routes/userRoute.js';
// import cookieParser from 'cookie-parser';
// import companyRoute from './routes/companyRoute.js';
// import jobRoute from './routes/jobRoute.js';
// import  applicationRoute from './routes/applicationRoute.js'
// import dns from 'dns';
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";


// dns.setServers(["1.1.1.1", "8.8.8.8"])



// const app = express();
// app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100
// });
// app.use(limiter);

// // Initialize Express


// //Connect to DB
// await ConnectDB();

// //Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// const corsOptions = {
//   origin: 'https://uplift-career-whfy.vercel.app/',
//   credentials: true,
// }

// app.use(cors(corsOptions));


// //Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);
 
// const PORT = process.env.PORT || 5000
// app.listen(PORT, ()=> {
//   console.log(`Server is running on port ${PORT}`);
// })
