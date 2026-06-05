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

const app = express();

// Helmet — crossOriginResourcePolicy off karo
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Manual CORS headers — sabse pehle
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://uplift-career-frontend.vercel.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization,Cookie");
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  keyGenerator: (req) => {
    const forwarded = req.headers["x-forwarded-for"];
    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }
    return req.ip;
  },
  validate: {
    keyGeneratorIpFallback: false,
  },
});
app.use(limiter);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect DB
await ConnectDB();

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;


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

// // Initialize app FIRST
// const app = express();

// // Security middlewares FIRST
// app.use(helmet());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   keyGenerator: (req) => {
//     return req.headers["x-forwarded-for"] || req.ip;
//   },
// });

// app.use(limiter);

// // Body parsers
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// // CORS (IMPORTANT FIX HERE)
// // Pehle OPTIONS preflight handle karo
// app.options(/(.*)/, cors());

// // CORS update karo
// app.use(
//   cors({
//     origin: "https://uplift-career-frontend.vercel.app",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization", "Cookie", "multipart/form-data"],
//     exposedHeaders: ["set-cookie"],
//   })
// );
// // Connect DB
// await ConnectDB();

// // Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// app.get("/", (req, res) => {
//     res.send("Backend Running");
// }) 
// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);});
// export default app;