const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')


router.get('/signup', (req,res)=> {
    res.render('auth/signup');
})

router.post('/signup', (req,res) => {

})

router.get('/login', (req,res) => {
    res.render('auth/login');
})

module.exports = router;