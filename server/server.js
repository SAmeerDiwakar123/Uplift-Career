import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);


import express from "express";
import "dotenv/config";
import ConnectDB from "./config/mongodb.js";
import userRoute from "./routes/userRoute.js";
import internshipRoute from "./routes/internshipRoute.js";
import cookieParser from "cookie-parser";
import companyRoute from "./routes/companyRoute.js";
import jobRoute from "./routes/jobRoute.js";
import applicationRoute from "./routes/applicationRoute.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import courseRoute from "./routes/courseRoute.js";
import enrollmentRoute from "./routes/enrollmentRoute.js";
import orderRoute from "./routes/orderRoute.js";
import adminRoute from "./routes/adminRoute.js";
import savedJobRoute from "./routes/savedJobRoute.js";
import notificationRoute from "./routes/notificationRoute.js";

const app = express();

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

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
  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS,PATCH"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type,Authorization,Cookie"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 500,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/api", limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

await ConnectDB();

app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/internship", internshipRoute);
app.use("/api/v1/saved", savedJobRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/enrollment", enrollmentRoute);
app.use("/api/v1/order", orderRoute);

app.get("/", (req, res) => {
  res.send("Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;