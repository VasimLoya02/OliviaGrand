const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

exports.getMenu = async (req, res, next) => {
  try {
    const { category, search, tags, available } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (available) filter.isAvailable = available === 'true';
    if (tags) filter.tags = { $in: tags.split(',') };
    if (search) filter.$text = { $search: search };

    const items = await MenuItem.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, count: items.length, data: items });
  } catch (err) {
    next(err);
  }
};

exports.getMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.json({ success: true, message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};

exports.toggleAvailability = async (req, res, next) => {
  try {
    const { isAvailable, stockCount } = req.body;
    const item = await MenuItem.findByIdAndUpdate(
      req.params.id,
      { isAvailable, ...(stockCount !== undefined && { stockCount }) },
      { new: true }
    );
    res.json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

// AI-style: "customers who ordered X also ordered Y" based on co-purchase history
exports.getRecommendations = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const orders = await Order.find({ 'items.menuItem': itemId }).select('items');
    const coOccurrence = {};

    orders.forEach((order) => {
      order.items.forEach((i) => {
        const id = i.menuItem.toString();
        if (id !== itemId) coOccurrence[id] = (coOccurrence[id] || 0) + 1;
      });
    });

    const topIds = Object.entries(coOccurrence).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([id]) => id);
    let recommendations = await MenuItem.find({ _id: { $in: topIds } });

    if (recommendations.length === 0) {
      const current = await MenuItem.findById(itemId);
      recommendations = await MenuItem.find({ category: current?.category, _id: { $ne: itemId } })
        .sort({ rating: -1 })
        .limit(5);
    }

    res.json({ success: true, data: recommendations });
  } catch (err) {
    next(err);
  }
};