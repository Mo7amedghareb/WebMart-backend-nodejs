const router = require('express').Router();
const authController = require('../controllers/auth.controller');

router.post('/sign-in', authController.signIn);

router.post('/sign-up', authController.signUp);

router.post('/forgot-password', authController.forgotPassword);

router.post('/verify-identity', authController.verifyIdentity);

router.post('/create-new-password', authController.createNewPassword);

module.exports = router;