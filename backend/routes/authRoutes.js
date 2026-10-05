const express = require('express');

const router = express.Router();


// ==========================================
// CONTROLLERS
// ==========================================

const {
  register,
  login,
  getMe,
  updateAddress
} = require('../controllers/authController');


// ==========================================
// AUTH MIDDLEWARE
// ==========================================

const {
  protect
} = require('../middleware/auth');


// ==========================================
// REGISTER
// ==========================================

router.post(
  '/register',
  register
);


// ==========================================
// LOGIN
// ==========================================

router.post(
  '/login',
  login
);


// ==========================================
// GET LOGGED-IN USER
// ==========================================

router.get(
  '/me',
  protect,
  getMe
);


// ==========================================
// UPDATE ADDRESS
// ==========================================

router.put(
  '/address',
  protect,
  updateAddress
);


module.exports = router;
