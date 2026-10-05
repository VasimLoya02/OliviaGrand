
const Cart = require("../models/Cart");


// ==========================================
// GET USER CART
// ==========================================

exports.getCart = async (req, res, next) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart) {

      return res.json({
        success: true,
        data: {
          items: [],
          totalAmount: 0,
        },
      });

    }

    res.json({
      success: true,
      data: cart,
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// ADD ITEM TO CART
// ==========================================

exports.addToCart = async (req, res, next) => {
  try {

    const {
      menuItem,
      name,
      price,
      image,
      quantity = 1,
    } = req.body;


    if (!menuItem || !name || price === undefined) {

      return res.status(400).json({
        success: false,
        message: "Menu item, name and price are required",
      });

    }


    let cart = await Cart.findOne({
      user: req.user._id,
    });


    // ==========================================
    // CREATE NEW CART
    // ==========================================

    if (!cart) {

      cart = await Cart.create({
        user: req.user._id,

        items: [
          {
            menuItem,
            name,
            price,
            image,
            quantity,
          },
        ],

        totalAmount:
          Number(price) * Number(quantity),
      });


      return res.status(201).json({
        success: true,
        message: "Item added to cart",
        data: cart,
      });

    }


    // ==========================================
    // CHECK EXISTING ITEM
    // ==========================================

    const existingItem = cart.items.find(
      (item) =>
        item.menuItem.toString() ===
        menuItem.toString()
    );


    if (existingItem) {

      existingItem.quantity += Number(quantity);

    } else {

      cart.items.push({
        menuItem,
        name,
        price,
        image,
        quantity,
      });

    }


    // ==========================================
    // CALCULATE TOTAL
    // ==========================================

    cart.totalAmount = cart.items.reduce(
      (total, item) =>
        total +
        Number(item.price) *
        Number(item.quantity),

      0
    );


    await cart.save();


    res.json({
      success: true,
      message: "Item added to cart",
      data: cart,
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// UPDATE CART ITEM QUANTITY
// ==========================================

exports.updateCartItem = async (req, res, next) => {
  try {

    const { quantity } = req.body;

    const cart = await Cart.findOne({
      user: req.user._id,
    });


    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });

    }


    const item = cart.items.find(
      (cartItem) =>
        cartItem.menuItem.toString() ===
        req.params.menuItemId
    );


    if (!item) {

      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });

    }


    if (Number(quantity) <= 0) {

      cart.items = cart.items.filter(
        (cartItem) =>
          cartItem.menuItem.toString() !==
          req.params.menuItemId
      );

    } else {

      item.quantity = Number(quantity);

    }


    cart.totalAmount = cart.items.reduce(
      (total, item) =>
        total +
        Number(item.price) *
        Number(item.quantity),

      0
    );


    await cart.save();


    res.json({
      success: true,
      message: "Cart updated",
      data: cart,
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// REMOVE ITEM FROM CART
// ==========================================

exports.removeFromCart = async (req, res, next) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    });


    if (!cart) {

      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });

    }


    cart.items = cart.items.filter(
      (item) =>
        item.menuItem.toString() !==
        req.params.menuItemId
    );


    cart.totalAmount = cart.items.reduce(
      (total, item) =>
        total +
        Number(item.price) *
        Number(item.quantity),

      0
    );


    await cart.save();


    res.json({
      success: true,
      message: "Item removed from cart",
      data: cart,
    });

  } catch (err) {

    next(err);

  }
};


// ==========================================
// CLEAR CART
// ==========================================

exports.clearCart = async (req, res, next) => {
  try {

    const cart = await Cart.findOne({
      user: req.user._id,
    });


    if (!cart) {

      return res.json({
        success: true,
        message: "Cart already empty",
      });

    }


    cart.items = [];
    cart.totalAmount = 0;


    await cart.save();


    res.json({
      success: true,
      message: "Cart cleared",
      data: cart,
    });

  } catch (err) {

    next(err);

  }
};

