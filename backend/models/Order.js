const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({

  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MenuItem',
    required: true
  },

  name: String,

  quantity: {
    type: Number,
    required: true,
    min: 1
  },

  price: {
    type: Number,
    required: true
  },

  notes: String,

});

const orderSchema = new mongoose.Schema(

  {

    orderNumber: {
      type: String,
      unique: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    items: [orderItemSchema],

    orderType: {
      type: String,
      enum: ['dine-in', 'takeaway', 'delivery'],
      required: true
    },

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Table'
    },

    deliveryAddress: {
      line1: String,
      city: String
    },

    status: {

      type: String,

      enum: [
        'placed',
        'confirmed',
        'preparing',
        'ready',
        'out-for-delivery',
        'served',
        'delivered',
        'cancelled'
      ],

      default: 'placed',

    },

    statusHistory: [
      {
        status: String,
        timestamp: {
          type: Date,
          default: Date.now
        }
      }
    ],

    subtotal: {
      type: Number,
      required: true
    },

    tax: {
      type: Number,
      default: 0
    },

    deliveryFee: {
      type: Number,
      default: 0
    },

    tip: {
      type: Number,
      default: 0
    },

    discount: {
      type: Number,
      default: 0
    },

    loyaltyPointsUsed: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      required: true
    },

    // ==========================================
    // PAYMENT
    // ==========================================

    payment: {

      method: {
        type: String,

        enum: [
          'cash',
          'wallet',
          'upi',
          'online'
        ],

        default: 'cash'
      },

      status: {

        type: String,

        enum: [
          'pending',
          'paid',
          'failed',
          'refunded'
        ],

        default: 'pending'

      },

    },

    estimatedTime: Number,

    specialInstructions: String,

  },

  {
    timestamps: true
  }

);


// ==========================================
// GENERATE ORDER NUMBER
// ==========================================

orderSchema.pre('save', function () {

  if (this.isNew) {

    this.orderNumber =
      'ORD-' +
      Date.now().toString().slice(-8);

    this.statusHistory.push({
      status: this.status
    });

  }

});


module.exports = mongoose.model(
  'Order',
  orderSchema
);