const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

/* GET ALL POSTS */
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* GET SINGLE POST */
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ADD COMMENT */
router.post("/:id/comments", async (req, res) => {
  try {
    const { userName, text } = req.body;

    if (!userName || !text) {
      return res.status(400).json({
        message: "userName and text are required",
      });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment = {
      userName,
      text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(201).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* EDIT COMMENT */
router.put("/:postId/comments/:commentId", async (req, res) => {
  try {
    const { text, userName } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required" });
    }

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (userName && comment.userName !== userName) {
      return res.status(403).json({
        message: "You can only edit your own comment",
      });
    }

    comment.text = text;
    await post.save();

    res.json({
      message: "Comment updated successfully",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* DELETE COMMENT */
router.delete("/:postId/comments/:commentId", async (req, res) => {
  try {
    const { userName } = req.body;

    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = post.comments.id(req.params.commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (userName && comment.userName !== userName) {
      return res.status(403).json({
        message: "You can only delete your own comment",
      });
    }

    comment.deleteOne();
    await post.save();

    res.json({
      message: "Comment deleted successfully",
      comments: post.comments,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


const {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");
console.log({
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
});

router.get("/", getPosts);
router.get("/:id", getPostById);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);




module.exports = router;