const router = require('express').Router();
const checkoutController = require('../controllers/checkout.controller');
const { protect } = require('../Middlewares/auth.middleware');

router.use(protect);

router.post('/', checkoutController.checkout);

module.exports = router;