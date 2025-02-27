const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userFullName: { type: String, required: true },
    commentText: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userFullName: {
      type: String,
      required: true,
    },
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
