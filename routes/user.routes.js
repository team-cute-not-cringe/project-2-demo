const express = require('express');
const User = require('../models/User.model');
const router = express.Router();


router.get('/user-profile', (req,res) => {
    res.render('user/user-profile')
    
})

router.post('/logout', (req, res, next) => {
    req.session.destroy(err => {
      if (err) next(err);
      res.redirect('/');
    });
  });

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