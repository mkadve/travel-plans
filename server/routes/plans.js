const express = require('express');

const feedController = require('../controllers/travel-plans');

const router = express.Router();

// GET /feed/posts
router.get('/search/:id', feedController.getCityNames);


// POST /feed/post
router.post('/plans', feedController.createPost);

module.exports = router;