// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import ConnectDB from "./config/mongodb.js";
// import userRoute from "./routes/userRoute.js";
// import cookieParser from "cookie-parser";
// import companyRoute from "./routes/companyRoute.js";
// import jobRoute from "./routes/jobRoute.js";
// import applicationRoute from "./routes/applicationRoute.js";
// import dns from "dns";
// import helmet from "helmet";
// import rateLimit from "express-rate-limit";

// // DNS config
// dns.setServers(["1.1.1.1", "8.8.8.8"]);

// const app = express();

// app.use(helmet({
//   crossOriginEmbedderPolicy: false,
// }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use(limiter);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// app.use(cors({
//   origin: [
//     "https://uplift-career-whfy.vercel.app",
//     "http://localhost:5173"
//   ],
//   credentials: true,
// }));

// app.get("/", (req, res) => {
//   res.json({ status: "ok", message: "API running 🚀" });
// });

// const startServer = async () => {
//   await ConnectDB();

//   app.listen(process.env.PORT || 5000, () => {
//     console.log("Server started");
//   });
// };

// startServer();





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
  keyGenerator: (req) => {
    return req.headers["x-forwarded-for"] || req.ip;
  },
});

app.use(limiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS (IMPORTANT FIX HERE)
// Pehle OPTIONS preflight handle karo
app.options(/(.*)/, cors());

// CORS update karo
app.use(
  cors({
    origin: "https://uplift-career-frontend.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie", "multipart/form-data"],
    exposedHeaders: ["set-cookie"],
  })
);
// Connect DB
await ConnectDB();

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
    res.send("Backend Running");
}) 
// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);});
export default app;


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

// dns.setServers(["1.1.1.1", "8.8.8.8"])



// const app = express();
// app.use(helmet());

// // Initialize Express


// //Connect to DB
// await ConnectDB();

// //Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// const corsOptions = {
//   origin: true,
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

