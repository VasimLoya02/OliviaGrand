const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    table: { type: mongoose.Schema.Types.ObjectId, ref: 'Table' },
    partySize: { type: Number, required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'seated', 'completed', 'cancelled', 'no-show'],
      default: 'pending',
    },
    specialRequests: String,
    contactPhone: String,
  },
  { timestamps: true }
);

reservationSchema.index({ date: 1, timeSlot: 1, table: 1 });

module.exports = mongoose.model('Reservation', reservationSchema);