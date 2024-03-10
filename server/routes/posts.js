const express = require('express');
const router = express.Router();
const postController = require('../controllers/postControllers');

// Add a new post
router.post('/api/posts', postController.createPost);

// Get posts for the dashboard
router.get('/api/posts', postController.getPosts);

module.exports = router;
