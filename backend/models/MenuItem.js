const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
     category: {
      type: String,
      required: true,
      enum: [
        "Indian",
        "Italian",
        "Chinese",
        "Mexican",
        "Continental",
        "Desserts",
        "Beverages",
      ],
    },
    price: { type: Number, required: true },
    discountPrice: { type: Number, default: null },
    images: [{ type: String }],
    tags: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
    stockCount: { type: Number, default: null },
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
  },
  { timestamps: true }
);

menuItemSchema.index({ name: 'text', description: 'text', tags: 'text' });

menuItemSchema.methods.getEffectivePrice = function () {
  return this.discountPrice ?? this.price;
};

module.exports = mongoose.model('MenuItem', menuItemSchema);