const express = require("express");

const router = express.Router();

const {
  getDashboard,
  getInventoryAlerts,
  getStaff,
  updateStaffRole,
  getUsers,
  getCustomers,
  getAllOrders,
  getReservations,
  getReviews,
} = require("../controllers/adminController");

const { protect, authorize } = require("../middleware/auth");
const adminController = require("../controllers/adminController");
const Review = require('../models/Review');

// ==========================================
// ADMIN AUTH MIDDLEWARE
// ==========================================

router.use(
  protect,
  authorize("admin", "staff")
);


// ==========================================
// DASHBOARD
// ==========================================

router.get(
  "/dashboard",
  adminController.getDashboard
);


// ==========================================
// INVENTORY
// ==========================================

router.get(
  "/inventory-alerts",
  adminController.getInventoryAlerts
);


// ==========================================
// STAFF
// ==========================================

router.get(
  "/staff",
  adminController.getStaff
);

router.patch(
  "/staff/:id/role",
  authorize("admin"),
  adminController.updateStaffRole
);


// ==========================================
// USERS
// ==========================================

router.get(
  "/users",
  adminController.getUsers
);


// ==========================================
// CUSTOMERS
// ==========================================

router.get(
  "/customers",
  adminController.getCustomers
);


// ==========================================
// ORDERS
// ==========================================

router.get(
  "/orders",
  adminController.getAllOrders
);


console.log("=================================");
console.log("ADMIN CONTROLLER CHECK");
console.log("getDashboard:", typeof getDashboard);
console.log("getInventoryAlerts:", typeof getInventoryAlerts);
console.log("getStaff:", typeof getStaff);
console.log("updateStaffRole:", typeof updateStaffRole);
console.log("getUsers:", typeof getUsers);
console.log("getCustomers:", typeof getCustomers);
console.log("getAllOrders:", typeof getAllOrders);
console.log("getReservations:", typeof getReservations);
console.log("getReviews:", typeof getReviews);
console.log("=================================");


// ==========================================
// RESERVATIONS
// ==========================================

router.get(
  "/reservations",
  adminController.getReservations
);


// ==========================================
// REVIEWS
// ==========================================

router.get(
  '/reviews',
  protect,
  authorize('admin'),
  async (req, res, next) => {
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

    } catch (error) {

      next(error);

    }
  }
);


module.exports = router;