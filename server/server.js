import express from "express";
import { auth } from "express-openid-connect";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connect from "./db/connect.js";
import asyncHandler from "express-async-handler";
import fs from "fs";
import User from "./models/UserModel.js";
import { log } from "console";
import cron from "node-cron";
import axios from "axios";
import Job from "./models/JobModel.js";
import { fetchExternalJobs } from "./controllers/jobController.js";
dotenv.config();

const app = express();

// Determine environment
const isProduction = process.env.NODE_ENV?.trim() === "production";
console.log("Running in", process.env.NODE_ENV);

// Auth0 configuration
const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  routes: {
    postLogoutRedirect: process.env.CLIENT_URL,
    callback: "/callback",
    logout: "/logout",
    login: "/login",
  },
  session: {
    absoluteDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
    cookie: {
      secure: isProduction, // Only secure in production
      sameSite: isProduction ? "None" : "Lax", // Cross-site support in prod
      // No domain set for localhost
    },
  },
};

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Define fetch-external route before auth middleware
app.get('/api/v1/jobs/fetch-external', fetchExternalJobs);

console.log('Auth config:', {
  baseURL: config.baseURL,
  clientID: config.clientID ? 'SET' : 'NOT SET',
  issuerBaseURL: config.issuerBaseURL,
  routes: config.routes
});

app.use(auth(config));

// Error handling middleware for auth
app.use((err, req, res, next) => {
  console.log('Auth error:', err.name, err.message);
  if (err.name === 'UnauthorizedError' || err.name === 'BadRequestError') {
    return res.redirect(process.env.CLIENT_URL || 'http://localhost:3000');
  }
  next(err);
});

// function to check if user exists in the db
const ensureUserInDB = asyncHandler(async (user) => {
  try {
    const existingUser = await User.findOne({ auth0Id: user.sub });

    if (!existingUser) {
      // create a new user document
      const newUser = new User({
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        role: "jobseeker",
        profilePicture: user.picture,
      });

      await newUser.save();

      console.log("New user created in database");
    } else {
      console.log("User authenticated successfully");
    }
  } catch (error) {
    console.log("Error checking or adding user to db", error.message);
  }
});

app.get("/", async (req, res) => {
  if (req.oidc.isAuthenticated()) {
    await ensureUserInDB(req.oidc.user);
    return res.redirect(process.env.CLIENT_URL);
  } else {
    return res.send("Logged out");
  }
});

// routes
const routeFiles = fs.readdirSync("./routes");

routeFiles.forEach((file) => {
  // import dynamic routes
  import(`./routes/${file}`)
    .then((route) => {
      app.use("/api/v1/", route.default);
    })
    .catch((error) => {
      console.log("Error importing route", error);
    });
});

// Schedule job to fetch external jobs every hour
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled job to fetch external jobs...');
  try {
    const options = {
      method: 'GET',
      url: 'https://jsearch.p.rapidapi.com/search',
      params: {
        query: 'developer jobs',
        page: '1',
        num_pages: '1'
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    const externalJobs = response.data.data;

    // Map external jobs to our schema
    const jobsToSave = externalJobs.map(job => ({
      title: job.job_title,
      description: job.job_description,
      location: job.job_city + ', ' + job.job_state + ', ' + job.job_country,
      salary: job.job_min_salary || 50000,
      salaryType: 'Year',
      negotiable: false,
      jobType: [job.job_employment_type || 'Full-time'],
      tags: job.job_required_skills || [],
      skills: job.job_required_skills || [],
      companyDescription: job.employer_website || '',
      source: 'jsearch',
      createdBy: null,
    }));

    // Save jobs to DB, avoid duplicates
    for (const jobData of jobsToSave) {
      const existingJob = await Job.findOne({
        title: jobData.title,
        location: jobData.location,
        source: 'jsearch'
      });
      if (!existingJob) {
        const job = new Job(jobData);
        await job.save();
      }
    }

    console.log('External jobs fetched and saved successfully');
  } catch (error) {
    console.log('Error fetching external jobs:', error);
  }
});

const server = async () => {
  try {
    await connect();

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Server error", error.message);
    process.exit(1);
  }
};

server();