const express = require("express");
const Post = require("../models/Post.model");
const router = express.Router();

//Gallery Page
//need to get all the posts with findAll
router.get("/gallery", (req, res) => {
  Post.find()
    .then((allPosts) => {
      res.render("posts/gallery", { allPosts });
    })
    .catch((err) => console.log(`There is an error on the gallery: ${err}`));
});

//Post Details page, needs req.params to show specific post


router.get("/add-post/create", (req, res) => {
  res.render("user/add-post");
});

router.post("/add-post/create", (req, res) => {
  const { title, artist, artistLink, imageUrl } = req.body;
  Post.create({ title, artist, artistLink, imageUrl })
    .then((postFromDb) => {
      console.log("New post being created: ", postFromDb.title);
      res.redirect("/user-profile");
    })
    .catch((err) => console.log(`Whoops! There is an error ${err}`));
});

router.get("/post/:postId", (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((postToEdit) => {
      res.render("posts/post-details",  postToEdit );
    })
    .catch((err) => console.log(`This is a post-detail error: ${err}`));
});

router.get("/post/:postId/edit", (req, res) => {
  const { postId } = req.params;
  Post.findById(postId)
    .then((post) => {
      res.render("user/edit-post", { post });
    })
    .catch((err) => console.log(`This is a post-detail error: ${err}`));
});

router.post("/post/:postId/edit", (req, res) => {
  const { postId } = req.params;
  const { title, artist, artistLink, imageUrl } = req.body;
  Post.findByIdAndUpdate(postId, { title, artist, artistLink, imageUrl }, {new:true})
  .then(updatedPost => {
    console.log(updatedPost)
    res.redirect(`/post/${updatedPost.id}`)
  })
  .catch(err => console.log(`Oops! There is an update error: ${err}`))
});

router.post('/post/:postId/delete',(req,res) => {
    const { postId } = req.params;
Post.findByIdAndDelete(postId)
.then(() => {
    res.redirect('/gallery');
})
.catch(error => console.log(`There is a delete error: ${error}`))
    
})

// lalalala

module.exports = router;
