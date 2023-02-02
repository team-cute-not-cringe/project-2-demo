const express = require("express");
const Post = require("../models/Post.model");
const router = express.Router();
const { isLoggedIn, isLoggedOut } = require("../middleware/path.guard");
const User = require("../models/User.model");
const fileUploader = require('../config/cloudinary.config');

//Gallery Page
router.get("/gallery", (req, res) => {
    // console.log('in the gallery')

  Post.find()
    .populate("user")
    .then((allPosts) => {
      res.render("posts/gallery", { allPosts });
    //   console.log(allPosts);
    })
    .catch((err) => console.log(`There is an error on the gallery: ${err}`));
});

//Post Details page, needs req.params to show specific post

router.get("/add-post/create", isLoggedIn, (req, res) => {
  res.render("user/add-post");
});

router.post("/add-post/create",fileUploader.single('animal-art-img'), (req, res) => {
  const { title, artist, artistLink, imageUrl, user } = req.body;
  Post.create({
    title,
    artist,
    artistLink,
    imageUrl: req.file.path,
    user: req.session.currentUser._id
  })
    .then((postFromDb) => {
        
      res.redirect(`/profile/${req.session.currentUser._id}`);
    })
    .catch((err) => console.log(`Whoops! There is an error ${err}`));
});

router.get("/post/:postId", (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
  .populate("user")
    .then((postToEdit) => {
        if(req.session.currentUser.username === postToEdit.user.username){
            postToEdit.owner = true

        }
      res.render("posts/post-details", postToEdit);
    })
    .catch((err) => console.log(`This is a post-detail error: ${err}`));
});

router.get("/post/:postId/edit", isLoggedIn, (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((post) => {
      res.render("user/edit-post", post);
    })
    .catch((err) => console.log(`This is a post-detail error: ${err}`));
});

router.post("/post/:postId/edit",fileUploader.single('animal-art-img'), (req, res) => {
  const { postId } = req.params;
  const { title, artist, artistLink, existingImage } = req.body;
 
  let imageUrl;
  if (req.file) {
    imageUrl = req.file.path;
  } else {
    imageUrl = existingImage;
  }
  Post.findByIdAndUpdate(
    postId,
    { title, artist, artistLink, imageUrl },
    { new: true }
  )
    .then((updatedPost) => {
    //   console.log(updatedPost);

      res.redirect(`/post/${updatedPost.id}`);
    })
    .catch((err) => console.log(`Oops! There is an update error: ${err}`));
});

router.post("/post/:postId/delete", (req, res) => {
  const { postId } = req.params;
  Post.findByIdAndDelete(postId)
    .then(() => {
      res.redirect("/gallery");
    })
    .catch((error) => console.log(`There is a delete error: ${error}`));
});

module.exports = router;
