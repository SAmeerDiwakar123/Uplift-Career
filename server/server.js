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
import courseRoute from "./routes/courseRoute.js"
import enrollmentRoute from "./routes/enrollmentRoute.js"
import orderRoute from "./routes/orderRoute.js";


// DNS config
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

// Helmet — crossOriginResourcePolicy off karo
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// Manual CORS headers — sabse pehle
app.use((req, res, next) => {
  const allowedOrigins = [
    "https://uplift-career-frontend.vercel.app",
    "http://localhost:5173",
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
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
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/enrollment", enrollmentRoute);
app.use("/api/v1/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
