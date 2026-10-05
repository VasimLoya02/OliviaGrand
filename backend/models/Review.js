  const mongoose = require('mongoose');

  const reviewSchema = new mongoose.Schema(
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
      order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: { type: String, default: '' },
      response: { text: String, respondedAt: Date },
    },
    { timestamps: true }
  );

  reviewSchema.index({ user: 1, menuItem: 1, order: 1 }, { unique: true });

  module.exports = mongoose.model('Review', reviewSchema);