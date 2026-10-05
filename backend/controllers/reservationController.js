const Reservation = require('../models/Reservation');
const Table = require('../models/Table');

exports.checkAvailability = async (req, res, next) => {
  try {
    const { date, timeSlot, partySize } = req.query;

    const bookedTableIds = await Reservation.find({
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed', 'seated'] },
    }).distinct('table');

    const availableTables = await Table.find({
      _id: { $nin: bookedTableIds },
      capacity: { $gte: Number(partySize) },
      status: { $ne: 'reserved' },
    });

    res.json({ success: true, count: availableTables.length, data: availableTables });
  } catch (err) {
    next(err);
  }
};

exports.createReservation = async (req, res, next) => {
  try {
    const { tableId, partySize, date, timeSlot, specialRequests, contactPhone } = req.body;

    const conflict = await Reservation.findOne({
      table: tableId,
      date: new Date(date),
      timeSlot,
      status: { $in: ['pending', 'confirmed', 'seated'] },
    });
    if (conflict) return res.status(409).json({ success: false, message: 'Table already booked for this slot' });

    const reservation = await Reservation.create({
      user: req.user._id,
      table: tableId,
      partySize,
      date,
      timeSlot,
      specialRequests,
      contactPhone,
      status: 'confirmed',
    });

    await Table.findByIdAndUpdate(tableId, { status: 'reserved' });

    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    next(err);
  }
};

exports.getReservations = async (req, res, next) => {
  try {
    const filter = ['admin', 'staff'].includes(req.user.role) ? {} : { user: req.user._id };
    const reservations = await Reservation.find(filter)
      .populate('table', 'tableNumber capacity')
      .populate('user', 'name phone')
      .sort({ date: 1 });
    res.json({ success: true, count: reservations.length, data: reservations });
  } catch (err) {
    next(err);
  }
};

exports.updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });

    if (['completed', 'cancelled', 'no-show'].includes(status)) {
      await Table.findByIdAndUpdate(reservation.table, { status: 'available' });
    }

    res.json({ success: true, data: reservation });
  } catch (err) {
    next(err);
  }
};