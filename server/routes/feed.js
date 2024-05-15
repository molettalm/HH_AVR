// import express
const express = require('express');
// import the logic controller
const feedController = require('../controllers/feed');
// create a router
const router = express.Router();
// define your routes
// add the function that should be executed for this route
// GET /feed/posts will be handled right now
router.get('/posts', feedController.getPosts);
// POST /feed/post will be handled right now
router.post('/post', feedController.createPost);
// export the router
module.exports = router;