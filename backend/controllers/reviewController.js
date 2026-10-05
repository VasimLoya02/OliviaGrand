const Review = require('../models/Review');
const MenuItem = require('../models/MenuItem');


// ==========================================
// CREATE REVIEW
// ==========================================

exports.createReview = async (req, res, next) => {
  try {

    const { menuItemId, orderId, rating, comment } = req.body;

    const review = await Review.create({
      user: req.user._id,
      menuItem: menuItemId,
      order: orderId,
      rating,
      comment,
    });

    const stats = await Review.aggregate([
      {
        $match: {
          menuItem: review.menuItem
        }
      },
      {
        $group: {
          _id: '$menuItem',
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    if (stats.length) {

      await MenuItem.findByIdAndUpdate(
        menuItemId,
        {
          rating: +stats[0].avgRating.toFixed(1),
          numReviews: stats[0].count,
        }
      );

    }

    res.status(201).json({
      success: true,
      data: review
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// GET REVIEWS FOR ONE MENU ITEM
// ==========================================

exports.getReviewsForItem = async (req, res, next) => {
  try {

    const reviews = await Review.find({
      menuItem: req.params.menuItemId
    })
      .populate('user', 'name email')
      .populate('menuItem', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// GET ALL REVIEWS - ADMIN
// ==========================================

exports.getAllReviews = async (req, res, next) => {
  try {

    const reviews = await Review.find()
      .populate('user', 'name email')
      .populate('menuItem', 'name')
      .populate('order', 'orderNumber')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// RESPOND TO REVIEW
// ==========================================

exports.respondToReview = async (req, res, next) => {
  try {

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        response: {
          text: req.body.text,
          respondedAt: new Date()
        }
      },
      {
        new: true
      }
    );

    res.json({
      success: true,
      data: review
    });

  } catch (err) {

    next(err);

  }
};