const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const saltRounds = 10;
const { isLoggedIn, isLoggedOut } = require("../middleware/path.guard");

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render("auth/signup", {
      errorMessage: "Please fill required fields! Meow!",
    });
    return;
  }
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res.status(500).render("auth/signup", {
      errorMessage:
        "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter. Chirp!",
    });
    return;
  }
  bcrypt
    .genSalt(saltRounds)
    .then((salt) => {
      return bcrypt.hash(password, salt); //method that hashes/encrypts our password & takes two arguments, 1:password, 2:salt
    })
    .then((hashedPassword) => {
      // return
      User.create({
        username: username,
        password: hashedPassword,
      });
    })
    .then(() => res.redirect("/")) //validation message: "Yay!You are signed in now"
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res.status(500).render("auth/signup", { errorMessage: error.message });
      } else if (error.code === 11000) {
        res.render("auth/signup", {
          errorMessage:
            "Ooops! This Username is already in use! Choose another one! Woof!",
        });
      } else {
        next(error);
      }
    });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.render("auth/login", {
      errorMessage: "Please fill required fields! Meow!",
    });
    return;
  }
  //add validation if user entered both username & password
  User.findOne({ username }).then((user) => {
    if (!user) {
      res.render("auth/login", {
        errorMessage: "User not found.",
      });
    } else if (bcrypt.compareSync(password, user.password)) {
      req.session.currentUser = user.toObject();
      delete req.session.currentUser.password
      res.redirect(`/profile/${req.session.currentUser._id}`);
    } else {
      res.render("auth/login", { errorMessage: "incorrect password" });
    }
  });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) next(err);
    res.redirect("/");
  });
});

module.exports = router;
