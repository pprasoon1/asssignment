const Post = require('../models/Post'); // Import your Post model

// Controller for creating a new post
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }

    // Assuming you have a user ID available from authentication
    const userId = req.user.id; // Adjust this based on your authentication setup

    // Create a new post
    const newPost = new Post({ content, userId });
    await newPost.save();

    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller for retrieving posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    return res.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};
