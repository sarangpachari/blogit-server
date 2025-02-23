const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./database/db");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

//CONNECTING DATABASE
connectDB();

//SETTING UP EXPRESS
const app = express();

//MIDDLEWARE
app.use(cors());
app.use(bodyParser.json());

//ROUTES
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome to Blog Server !");
});
