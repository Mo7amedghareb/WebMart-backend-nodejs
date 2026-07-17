const router = require('express').Router();
const cartController = require('../controllers/cart.controller');
const { protect } = require('../Middlewares/auth.middleware');

router.use(protect);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.delete('/:id', cartController.removeFromCart);
router.put('/:id', cartController.updateCartItem);

module.exports = router;