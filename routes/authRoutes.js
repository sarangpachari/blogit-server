const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

//REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    //CHECK IF USER EXISTS
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists !" });
    }

    //HASH THE PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    //CREATE A NEW USER
    const newUser = new User({ fullname, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Unable to register !" });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //CHECKING USER EXISTS
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials !" });
    }

    //COMPARE PASSWORDS
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json( {message:'Invalid Credentials !'} )
    }

    //GENERATE JWT TOKEN
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '72h'})

    res.json({token})

  } catch (error) {
    res.status(500).json({ message: 'Unable to login' })
  }
});




module.exports = router
