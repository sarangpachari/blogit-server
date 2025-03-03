const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const multer = require("multer");
const path = require("path");

dotenv.config();

//CONNECTING DATABASE
connectDB();

//SETTING UP EXPRESS
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static('./uploads'))

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Blog Server !");
});
