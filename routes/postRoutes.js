const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/multerConfig");

//CREATE POST & THUMBNAIL UPLOAD
router.post(
  "/editor/new",
  authMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    try {
      const newPost = new Post({
        ...req.body,
        userId: req.user.id,
        userFullName: req.user.fullname,
        thumbnail: req.file ? req.file.path : "",
      });

      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

//GET EACH USER POST
router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const userPosts = await Post.find({userId}).sort({createdAt: -1});

    res.status(200).json(userPosts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error while fetching user posts" });
  }
});

//GET ALL POSTS
router.get("/", async(req,res)=>{
  try {
    const posts = await Post.find().sort({created: -1})
    res.status(200).json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error while fetching posts" });
  }
})

module.exports = router;
