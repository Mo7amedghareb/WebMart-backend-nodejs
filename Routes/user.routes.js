const router = require('express').Router();
const userController = require('../controllers/user.controller');
const { protect } = require('../Middlewares/auth.middleware');

router.use(protect);

router.get('/favourites', userController.getFavourites);
router.post('/favourites', userController.addToFavourites);
router.delete('/favourites/:id', userController.removeFromFavourites);

module.exports = router;