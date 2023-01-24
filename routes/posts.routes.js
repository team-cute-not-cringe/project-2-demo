const express = require('express');
const Post = require('../models/Post.model');
const router = express.Router();

//Gallery Page
//need to get all the posts with findAll
router.get('/gallery', (req,res) => {
    res.render('posts/gallery')
})

//Post Details page, needs req.params to show specific post
router.get('/post/:postId', (req,res) => {
    res.render('posts/post-details')
})




module.exports = router;