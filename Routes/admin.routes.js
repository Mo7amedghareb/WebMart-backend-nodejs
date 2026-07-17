const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { protect, isAdmin } = require('../Middlewares/auth.middleware');

router.use(protect, isAdmin);

router.get('/dashboard', adminController.getDashboard);

router.post('/products', adminController.addProduct);
router.put('/products/:id', adminController.editProduct);
router.delete('/products/:id', adminController.deleteProduct);

router.get('/orders', adminController.getAllOrders);
router.get('/orders/:id', adminController.getOrderDetails);
router.put('/orders/:id/status', adminController.updateOrderStatus);

router.get('/customers', adminController.getCustomers);
router.get('/settings', adminController.getSettings);
router.delete('/orders/:id', adminController.deleteOrder);

module.exports = router;