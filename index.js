import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import passport from "passport";
import cors from 'cors'
import { connectDB } from "./config/db.js";

// configuration
dotenv.config();

//connect Databse
connectDB();

const app = express();
app.use(express.json());
app.use(cors())
app.use(
  session({ secret: "kaalastar", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

//import api routers
import userRoutes from "./routes/userRoutes.js";

//route level middleware to load api router
app.use("/user", userRoutes);

//imports
import categoryRoute from "./routes/categoryRoutes.js";
app.use("/api/profile", categoryRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server Running on port ${process.env.PORT}`);
});
