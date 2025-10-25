import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.send("Mental Health API Running Successfully");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
