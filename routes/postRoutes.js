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
    const userPosts = await Post.find({ userId }).sort({ createdAt: -1 });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching user posts" });
  }
});

//GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({ isPrivate: false }).sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while fetching posts" });
  }
});

//REMOVE POSTS
router.delete("/:id/remove", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const removePost = await Post.findByIdAndDelete({ _id: id });
    res.status(200).json(removePost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//EDIT POSTS
router.put(
  "/editor/:id",
  authMiddleware,
  upload.single("thumbnail"),
  async (req, res) => {
    const { id } = req.params;
    const { title, description, content, isPrivate } = req.body;
    try {
      const post = await Post.findById(id);

      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }

      //CHECKING EXISTING USER IS THE AUTHOR OF POST
      if (post.userId.toString() !== req.user.id) {
        return res
          .status(403)
          .json({ message: "Unauthorized to edit this post" });
      }

      post.title = title || post.title;
      post.description = description || post.description;
      post.content = content || post.content;
      post.isPrivate = isPrivate ?? post.isPrivate;

      //IF NEW UPLOAD CHANGE IT
      if (req.file) {
        post.thumbnail = `uploads/${req.file.filename}`;
      }

      await post.save();

      res.status(200).json({ message: "Post updated successfully", post });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server error while updating post" });
    }
  }
);

module.exports = router;
