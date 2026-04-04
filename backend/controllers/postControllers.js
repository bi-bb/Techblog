const Post = require("../models/Post");

// GET all posts
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
      error: error.message,
    });
  }
};

// GET single post by id
const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch post",
      error: error.message,
    });
  }
};


/* CREATE POST */
exports.createPost = async (req, res) => {
  try {
    const { title, description, content, category, author, image, tags } = req.body;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required",
      });
    }

    const newPost = await Post.create({
      title,
      description,
      content,
      category,
      author,
      image,
      tags: Array.isArray(tags) ? tags : [],
    });

    res.status(201).json({
      message: "Post created successfully",
      post: newPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* READ ALL POSTS */
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* READ SINGLE POST */
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* UPDATE POST */
exports.updatePost = async (req, res) => {
  try {
    const { title, description, content, category, author, image, tags } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        content,
        category,
        author,
        image,
        tags: Array.isArray(tags) ? tags : [],
      },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* DELETE POST */
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    res.json({
      message: "Post deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
};