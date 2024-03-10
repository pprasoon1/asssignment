const express = require('express')
const authController = require('../controllers/authControllers');
const postController = require('../controllers/postControllers');
const router = express.Router();

router.post('/signup', authController.signup);
router.get('/dashboard', /* Add route handler for fetching posts */);
router.post('/api/logout', authController.logout); // Change to POST method for logout
module.exports = router;

