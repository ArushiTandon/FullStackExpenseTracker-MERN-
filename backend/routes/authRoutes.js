const express = require('express');
const { signUp, login, getUser, uploadImage} = require('../controllers/userController')
const router = express.Router();
const passport = require('../middlewares/auth');
const { jwtAuthMiddleware } = require('../middlewares/jwt');
const upload = require('../middlewares/upload');

const localAuthMid = passport.authenticate('local', {session: false});

// Create a new user
router.post('/signup', signUp);

// Login
router.post('/login', localAuthMid,  login);

// get current user profile
router.get('/profile', jwtAuthMiddleware, getUser);

//upload profile image
router.post('/uploads', jwtAuthMiddleware ,upload.single("image"), uploadImage)
module.exports = router;