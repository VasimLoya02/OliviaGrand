const express = require('express');

const router = express.Router();

const {
  createReview,
  getReviewsForItem,
  getAllReviews,
  respondToReview
} = require('../controllers/reviewController');

const {
  protect,
  authorize
} = require('../middleware/auth');


// ==========================================
// GET REVIEWS FOR MENU ITEM
// ==========================================

router.get(
  '/menu/:menuItemId',
  getReviewsForItem
);


// ==========================================
// CREATE REVIEW
// ==========================================

router.post(
  '/',
  protect,
  createReview
);


// ==========================================
// ADMIN - GET ALL REVIEWS
// ==========================================

router.get(
  '/admin',
  protect,
  authorize('admin'),
  getAllReviews
);


// ==========================================
// RESPOND TO REVIEW
// ==========================================

router.patch(
  '/:id/respond',
  protect,
  authorize('admin', 'staff'),
  respondToReview
);


module.exports = router;