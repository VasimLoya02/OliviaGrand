const express = require('express');
const router = express.Router();
const {
  placeOrder, getOrders, getOrder, updateOrderStatus, cancelOrder, updatePaymentStatus,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.post('/', placeOrder);
router.get('/', getOrders);
router.get('/:id', getOrder);
router.patch('/:id/status', authorize('admin', 'staff', 'kitchen', 'delivery'), updateOrderStatus);
router.patch('/:id/cancel', cancelOrder);
router.patch('/:id/payment', authorize('admin', 'staff'), updatePaymentStatus);
router.patch('/:id/payment-status',authorize('admin', 'staff'),updatePaymentStatus);

module.exports = router;