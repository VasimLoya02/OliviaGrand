
const express = require("express");

const router = express.Router();

const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  }=  require("../controllers/CartController");

const {
  protect,
} = require("../middleware/auth");


// ==========================================
// ALL CART ROUTES REQUIRE LOGIN
// ==========================================

router.use(protect);


// ==========================================
// GET CART
// ==========================================

router.get(
  "/",
  getCart
);


// ==========================================
// ADD TO CART
// ==========================================

router.post(
  "/",
  addToCart
);


// ==========================================
// UPDATE QUANTITY
// ==========================================

router.patch(
  "/:menuItemId",
  updateCartItem
);


// ==========================================
// REMOVE ITEM
// ==========================================

router.delete(
  "/:menuItemId",
  removeFromCart
);


// ==========================================
// CLEAR CART
// ==========================================

router.delete(
  "/",
  clearCart
);


module.exports = router;
