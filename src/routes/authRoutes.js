const express = require('express');
const router = express.Router();

const resetPasswordHandler = require("../controllers/resetPasswordHandler");

const {
  forgotPassword,
  forgotPasswordValidation,
} = require('../controllers/auth/forgotpasswordController');

const {
  resetPassword,
  resetPasswordValidation,
} = require('../controllers/auth/resetpasswordController');

// POST /auth/forgot-password
router.post('/forgot-password', forgotPasswordValidation, forgotPassword);

// POST /auth/reset-password
router.post('/reset-password', resetPasswordValidation, resetPassword);

// POST /auth/reset-password/:token
router.post("/reset-password/:token", resetPasswordHandler);

module.exports = router;