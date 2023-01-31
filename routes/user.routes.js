const express = require('express');
const Post = require('../models/Post.model');
const User = require('../models/User.model');
const router = express.Router();


router.get('/user-profile', (req,res) => {
    console.log(req.session.currentUser)
   
    Post.find({user:req.session.currentUser._id})
    .populate('user', 'username')
    .then((allPosts) =>{
        res.render('user/user-profile', {allPosts})
    }
    )
    .catch(err => console.log('error finding user posts', err))
})

//need req.params to find specific post 
router.get('/edit/:postId', (req,res) => {
    res.render('user/edit-post')
})

router.get('/add-post', (req,res) => {
    res.render('user/add-post')
})

router.post('/edit/:postId/delete',(req,res) => {
    //findAndDelete 
    res.redirect('/user-profile')
})





module.exports = router;