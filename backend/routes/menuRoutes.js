const express = require('express');
const router = express.Router();
const {
  getMenu, getMenuItem, createMenuItem, updateMenuItem,
  deleteMenuItem, toggleAvailability, getRecommendations,
} = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getMenu);
router.get('/:id', getMenuItem);
router.get('/:id/recommendations', getRecommendations);

router.post('/', protect, authorize('admin'), createMenuItem);
router.put('/:id', protect, authorize('admin'), updateMenuItem);
router.delete('/:id', protect, authorize('admin'), deleteMenuItem);
router.patch('/:id/availability', protect, authorize('admin', 'staff', 'kitchen'), toggleAvailability);

module.exports = router;