import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import ConnectDB from './config/mongoDB.js';
import userRoute from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import companyRoute from './routes/companyRoute.js';
import jobRoute from './routes/jobRoute.js';
import  applicationRoute from './routes/applicationRoute.js'
import dns from 'dns';


dns.setServers(["1.1.1.1", "8.8.8.8"])


// Initialize Express
const app = express();


//Connect to DB
await ConnectDB();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
}

app.use(cors(corsOptions));


//Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
 
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
  console.log(`Server is running on port ${PORT}`);
})
