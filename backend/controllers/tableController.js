const Table = require('../models/Table');

exports.createTable = async (req, res, next) => {
  try {
    const { tableNumber, capacity, location } = req.body;
    const table = await Table.create({ tableNumber, capacity, location });
    res.status(201).json({ success: true, data: table });
  } catch (err) {
    next(err);
  }
};

exports.getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().populate('currentOrder', 'orderNumber status');
    res.json({ success: true, count: tables.length, data: tables });
  } catch (err) {
    next(err);
  }
};

exports.updateTableStatus = async (req, res, next) => {
  try {
    const table = await Table.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json({ success: true, data: table });
  } catch (err) {
    next(err);
  }
};