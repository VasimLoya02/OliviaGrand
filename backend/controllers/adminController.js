const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");
const User = require("../models/User");
const Reservation = require("../models/Reservation");
const Review = require("../models/Review");


// ==========================================
// DASHBOARD
// ==========================================

exports.getDashboard = async (req, res, next) => {
  try {
    const days = parseInt(req.query.range) || 7;

    const since = new Date(
      Date.now() - days * 24 * 60 * 60 * 1000
    );

    const [
      revenueStats,
      orderCount,
      topItems,
      newCustomers,
      pendingReservations,
    ] = await Promise.all([

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: since },
            "payment.status": "paid",
          },
        },
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$total" },
            avgOrderValue: { $avg: "$total" },
          },
        },
      ]),

      Order.countDocuments({
        createdAt: { $gte: since },
      }),

      Order.aggregate([
        {
          $match: {
            createdAt: { $gte: since },
          },
        },
        {
          $unwind: "$items",
        },
        {
          $group: {
            _id: "$items.name",
            totalSold: {
              $sum: "$items.quantity",
            },
          },
        },
        {
          $sort: {
            totalSold: -1,
          },
        },
        {
          $limit: 5,
        },
      ]),

      User.countDocuments({
        createdAt: { $gte: since },
        role: "customer",
      }),

      Reservation.countDocuments({
        status: "pending",
      }),

    ]);

    res.json({
      success: true,

      data: {
        totalRevenue:
          revenueStats[0]?.totalRevenue || 0,

        avgOrderValue:
          +(revenueStats[0]?.avgOrderValue || 0).toFixed(2),

        orderCount,

        topSellingItems: topItems,

        newCustomers,

        pendingReservations,
      },
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// INVENTORY ALERTS
// ==========================================

exports.getInventoryAlerts = async (req, res, next) => {
  try {

    const lowStock = await MenuItem
      .find({
        stockCount: {
          $ne: null,
          $lte: 10,
        },
      })
      .select("name stockCount category");

    res.json({
      success: true,
      count: lowStock.length,
      data: lowStock,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// STAFF
// ==========================================

exports.getStaff = async (req, res, next) => {
  try {

    const staff = await User
      .find({
        role: {
          $in: [
            "staff",
            "kitchen",
            "delivery",
            "admin",
          ],
        },
      })
      .select("-password");

    res.json({
      success: true,
      count: staff.length,
      data: staff,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// UPDATE STAFF ROLE
// ==========================================

exports.updateStaffRole = async (req, res, next) => {
  try {

    const user = await User
      .findByIdAndUpdate(
        req.params.id,
        {
          role: req.body.role,
        },
        {
          new: true,
        }
      )
      .select("-password");

    res.json({
      success: true,
      data: user,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// ALL USERS
// ==========================================

exports.getUsers = async (req, res, next) => {
  try {

    const users = await User
      .find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: users.length,
      data: users,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// CUSTOMERS
// ==========================================

exports.getCustomers = async (req, res, next) => {
  try {

    const customers = await User
      .find({
        role: "customer",
      })
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: customers.length,
      data: customers,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// ALL ORDERS
// ==========================================

exports.getAllOrders = async (req, res, next) => {
  try {

    const orders = await Order
      .find()
      .populate(
        "user",
        "name email phone"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// ALL RESERVATIONS
// ==========================================

exports.getReservations = async (req, res, next) => {
  try {

    const reservations = await Reservation
      .find()
      .populate(
        "user",
        "name email phone"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: reservations.length,
      data: reservations,
    });

  } catch (error) {
    next(error);
  }
};


// ==========================================
// ALL REVIEWS
// ==========================================

exports.getReviews = async (req, res, next) => {
  try {

    const reviews = await Review
      .find()
      .populate(
        "user",
        "name email"
      )
      .sort({
        createdAt: -1,
      });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews,
    });

  } catch (error) {
    next(error);
  }
};