const express = require("express");
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const router = express.Router();

router.get("/profile/:userId", (req, res) => {
    console.log("user")
    const { userId } = req.params;
    let userVar;
    User.findById(userId)
        .then((foundUser) => {
            userVar = foundUser;
            return Post.find({ user: userId })
                    .populate("user", "username")
    })
    .then((allPosts) => {
    //   console.log(allPosts);
      if (!allPosts) {
        // console.log(userVar)
        res.render("user/user-profile", userVar);
      }
      res.render("user/user-profile", { allPosts, username: userVar });
    })
    .catch((err) => console.log("error finding user posts", err));
});

//need req.params to find specific post
// router.get('/edit/:postId', (req,res) => {
//     res.render('user/edit-post')
// })

// router.get('/add-post', (req,res) => {
//     res.render('user/add-post')
// })

// router.post('/edit/:postId/delete',(req,res) => {
//     //findAndDelete
//     res.redirect('/user-profile')
// }) <- Reason for second delete route?

module.exports = router;
