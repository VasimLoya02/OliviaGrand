const Order = require('../models/Order');
const MenuItem = require('../models/MenuItem');
const User = require('../models/User');
const Table = require('../models/Table');

const TAX_RATE = 0.08;


// ==========================================
// PLACE ORDER
// ==========================================

exports.placeOrder = async (req, res, next) => {

  try {

    const {
      items,
      orderType,
      tableId,
      deliveryAddress,
      tip = 0,
      loyaltyPointsUsed = 0,
      specialInstructions,

      // ==========================================
      // PAYMENT METHOD
      // ==========================================

      paymentMethod = 'cash'

    } = req.body;


    // ==========================================
    // VALIDATE ITEMS
    // ==========================================

    if (!items || items.length === 0) {

      return res.status(400).json({
        success: false,
        message: 'Order must contain at least one item'
      });

    }


    // ==========================================
    // VALIDATE ORDER TYPE
    // ==========================================

    const allowedOrderTypes = [
      'dine-in',
      'takeaway',
      'delivery'
    ];


    if (!allowedOrderTypes.includes(orderType)) {

      return res.status(400).json({
        success: false,
        message: 'Invalid order type'
      });

    }


    // ==========================================
    // VALIDATE PAYMENT METHOD
    // ==========================================

    /*
      FRONTEND PAYMENT OPTIONS:

      Cash on Delivery -> cash
      Card Payment     -> card
      Online Payment   -> online

      Existing methods are also supported:
      UPI              -> upi
      Wallet           -> wallet
    */

    const allowedPaymentMethods = [
      'card',
      'cash',
      'online',
      'upi',
      'wallet'
    ];


    if (!allowedPaymentMethods.includes(paymentMethod)) {

      return res.status(400).json({
        success: false,
        message: 'Invalid payment method'
      });

    }


    // ==========================================
    // GET LOGGED-IN USER
    // ==========================================

    const user = await User.findById(
      req.user._id
    );


    if (!user) {

      return res.status(404).json({
        success: false,
        message: 'User not found'
      });

    }


    // ==========================================
    // GET SAVED DELIVERY ADDRESS
    // ==========================================

    let finalDeliveryAddress;


    if (orderType === 'delivery') {

      /*
        IMPORTANT:

        We are NOT asking the customer to enter
        address again from Checkout.

        We are using the address saved in
        the logged-in user's account.
      */

      if (
        !user.address ||
        !user.address.line1 ||
        !user.address.city
      ) {

        /*
          Optional fallback:
          If frontend sends an address and the user
          does not have one saved yet, use it.

          You can remove this fallback later if you
          want address to ONLY come from user profile.
        */

        if (
          deliveryAddress &&
          deliveryAddress.line1 &&
          deliveryAddress.city
        ) {

          finalDeliveryAddress = {
            line1: deliveryAddress.line1,
            city: deliveryAddress.city
          };

        } else {

          return res.status(400).json({
            success: false,
            message: 'Delivery address is not saved in your account'
          });

        }

      } else {

        finalDeliveryAddress = {
          line1: user.address.line1,
          city: user.address.city
        };

      }

    }


    // ==========================================
    // CALCULATE ORDER
    // ==========================================

    let subtotal = 0;

    const orderItems = [];


    for (const reqItem of items) {

      // ==========================================
      // VALIDATE QUANTITY
      // ==========================================

      if (
        !reqItem.quantity ||
        Number(reqItem.quantity) < 1
      ) {

        return res.status(400).json({
          success: false,
          message: 'Invalid item quantity'
        });

      }


      // ==========================================
      // FIND MENU ITEM
      // ==========================================

      const menuItem = await MenuItem.findById(
        reqItem.menuItemId
      );


      // ==========================================
      // ITEM NOT FOUND / UNAVAILABLE
      // ==========================================

      if (!menuItem || !menuItem.isAvailable) {

        return res.status(400).json({

          success: false,

          message:
            `${menuItem?.name || 'Item'} is unavailable`

        });

      }


      // ==========================================
      // CHECK STOCK
      // ==========================================

      if (
        menuItem.stockCount !== null &&
        menuItem.stockCount < Number(reqItem.quantity)
      ) {

        return res.status(400).json({

          success: false,

          message:
            `Not enough stock for ${menuItem.name}`

        });

      }


      // ==========================================
      // GET EFFECTIVE PRICE
      // ==========================================

      const price =
        menuItem.getEffectivePrice();


      // ==========================================
      // CALCULATE SUBTOTAL
      // ==========================================

      subtotal +=
        price * Number(reqItem.quantity);


      // ==========================================
      // ADD ORDER ITEM
      // ==========================================

      orderItems.push({

        menuItem: menuItem._id,

        name: menuItem.name,

        quantity: Number(reqItem.quantity),

        price,

        notes: reqItem.notes

      });


      // ==========================================
      // UPDATE STOCK
      // ==========================================

      if (menuItem.stockCount !== null) {

        menuItem.stockCount -=
          Number(reqItem.quantity);


        if (menuItem.stockCount === 0) {

          menuItem.isAvailable = false;

        }


        await menuItem.save();

      }

    }


    // ==========================================
    // ROUND SUBTOTAL
    // ==========================================

    subtotal =
      +subtotal.toFixed(2);


    // ==========================================
    // TAX
    // ==========================================

    const tax =
      +(subtotal * TAX_RATE).toFixed(2);


    // ==========================================
    // DELIVERY FEE
    // ==========================================

    const deliveryFee =
      orderType === 'delivery'
        ? 4.99
        : 0;


    // ==========================================
    // LOYALTY DISCOUNT
    // ==========================================

    const loyaltyDiscount =
      +(Number(loyaltyPointsUsed) * 0.01).toFixed(2);


    // ==========================================
    // FINAL TOTAL
    // ==========================================

    const total =
      +(
        subtotal +
        tax +
        deliveryFee +
        Number(tip) -
        loyaltyDiscount
      ).toFixed(2);


    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    /*
      Cash:
      pending until cash is received.

      Card:
      pending until real card payment is completed.

      Online:
      pending until real online payment is completed.

      UPI:
      pending until payment is completed.

      Wallet:
      pending until payment is completed.

      Since currently there is no real payment gateway,
      all payment methods start as pending.
    */

    let paymentStatus = 'pending';


    // ==========================================
    // PAYMENT STATUS
    // ==========================================

    // Dummy online payment
    if (
      paymentMethod === 'online' ||
      paymentMethod === 'upi' ||
      paymentMethod === 'wallet'
    ) {
      paymentStatus = 'paid';
    }


    // ==========================================
    // CREATE ORDER
    // ==========================================

    const order = await Order.create({

      // ==========================================
      // USER
      // ==========================================

      user: req.user._id,


      // ==========================================
      // ITEMS
      // ==========================================

      items: orderItems,


      // ==========================================
      // ORDER TYPE
      // ==========================================

      orderType,


      // ==========================================
      // TABLE
      // ==========================================

      table:
        tableId || undefined,


      // ==========================================
      // DELIVERY ADDRESS
      // ==========================================

      deliveryAddress:
        orderType === 'delivery'
          ? finalDeliveryAddress
          : undefined,


      // ==========================================
      // PRICE DETAILS
      // ==========================================

      subtotal,

      tax,

      deliveryFee,

      tip:
        Number(tip),

      discount:
        loyaltyDiscount,

      loyaltyPointsUsed:
        Number(loyaltyPointsUsed),

      total,


      // ==========================================
      // OTHER DETAILS
      // ==========================================

      specialInstructions,


      // ==========================================
      // ESTIMATED TIME
      // ==========================================

      estimatedTime:
        orderType === 'delivery'
          ? 40
          : 20,


      // ==========================================
      // PAYMENT
      // ==========================================

      payment: {

        method:
          paymentMethod,

        status:
          paymentStatus

      }

    });


    // ==========================================
    // UPDATE USER LOYALTY POINTS
    // ==========================================

    user.loyaltyPoints =
      Math.max(
        0,
        (user.loyaltyPoints || 0) -
        Number(loyaltyPointsUsed)
      ) +
      Math.floor(subtotal);


    await user.save();


    // ==========================================
    // UPDATE TABLE
    // ==========================================

    if (
      orderType === 'dine-in' &&
      tableId
    ) {

      await Table.findByIdAndUpdate(

        tableId,

        {
          status: 'occupied',

          currentOrder:
            order._id
        }

      );

    }


    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({

      success: true,

      message:
        'Order placed successfully',

      data:
        order

    });


  } catch (err) {

    console.error(
      'PLACE ORDER ERROR:',
      err
    );

    next(err);

  }

};



// ==========================================
// GET ORDERS
// ==========================================

exports.getOrders = async (
  req,
  res,
  next
) => {

  try {

    const filter =
      [
        'admin',
        'staff',
        'kitchen',
        'delivery'
      ].includes(req.user.role)

        ? {}

        : {
          user: req.user._id
        };


    if (req.query.status) {

      filter.status =
        req.query.status;

    }


    const orders =
      await Order.find(filter)

        .populate(
          'user',
          'name email phone address'
        )

        .populate(
          'items.menuItem',
          'name price images category'
        )

        .sort({
          createdAt: -1
        });


    res.json({

      success: true,

      count:
        orders.length,

      data:
        orders

    });


  } catch (err) {

    next(err);

  }

};



// ==========================================
// GET SINGLE ORDER
// ==========================================

exports.getOrder = async (
  req,
  res,
  next
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      )

        .populate(
          'user',
          'name email phone address'
        )

        .populate(
          'items.menuItem',
          'name price images category'
        );


    if (!order) {

      return res.status(404).json({

        success: false,

        message:
          'Order not found'

      });

    }


    res.json({

      success: true,

      data:
        order

    });


  } catch (err) {

    next(err);

  }

};



// ==========================================
// UPDATE ORDER STATUS
// ==========================================

exports.updateOrderStatus = async (
  req,
  res,
  next
) => {

  try {

    const {
      status
    } = req.body;


    const allowedStatuses = [

      'placed',

      'confirmed',

      'preparing',

      'ready',

      'out-for-delivery',

      'served',

      'delivered',

      'cancelled'

    ];


    if (
      !allowedStatuses.includes(status)
    ) {

      return res.status(400).json({

        success: false,

        message:
          'Invalid order status'

      });

    }


    const order =
      await Order.findById(
        req.params.id
      );


    if (!order) {

      return res.status(404).json({

        success: false,

        message:
          'Order not found'

      });

    }


    // ==========================================
    // UPDATE STATUS
    // ==========================================

    order.status =
      status;


    order.statusHistory.push({

      status

    });


    await order.save();


    // ==========================================
    // FREE TABLE
    // ==========================================

    if (
      [
        'served',
        'delivered',
        'cancelled'
      ].includes(status) &&
      order.table
    ) {

      await Table.findByIdAndUpdate(

        order.table,

        {

          status:
            'cleaning',

          currentOrder:
            null

        }

      );

    }


    res.json({

      success: true,

      data:
        order

    });


  } catch (err) {

    next(err);

  }

};



// ==========================================
// CANCEL ORDER
// ==========================================

exports.cancelOrder = async (
  req,
  res,
  next
) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      );


    if (!order) {

      return res.status(404).json({

        success: false,

        message:
          'Order not found'

      });

    }

    // ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

exports.updatePaymentStatus = async (req, res, next) => {

  try {

    const { status } = req.body;

    const allowedPaymentStatuses = [
      "pending",
      "paid",
      "failed",
      "refunded"
    ];

    if (!allowedPaymentStatuses.includes(status)) {

      return res.status(400).json({
        success: false,
        message: "Invalid payment status"
      });

    }

    const order = await Order.findById(req.params.id);

    if (!order) {

      return res.status(404).json({
        success: false,
        message: "Order not found"
      });

    }

    // ==========================================
    // UPDATE PAYMENT STATUS
    // ==========================================

    order.payment.status = status;

    await order.save();

    res.json({

      success: true,

      message:
        status === "paid"
          ? "Payment marked as paid successfully"
          : `Payment status updated to ${status}`,

      data: order

    });

  } catch (err) {

    console.error(
      "UPDATE PAYMENT STATUS ERROR:",
      err
    );

    next(err);

  }

};


    // ==========================================
    // CHECK COMPLETED ORDER
    // ==========================================

    if (
      [
        'served',
        'delivered'
      ].includes(order.status)
    ) {

      return res.status(400).json({

        success: false,

        message:
          'Cannot cancel a completed order'

      });

    }


    // ==========================================
    // CANCEL ORDER
    // ==========================================

    order.status =
      'cancelled';


    order.statusHistory.push({

      status:
        'cancelled'

    });


    await order.save();


    res.json({

      success: true,

      message:
        'Order cancelled successfully',

      data:
        order

    });


  } catch (err) {

    next(err);

  }

};

// ==========================================
// UPDATE PAYMENT STATUS
// ==========================================

exports.updatePaymentStatus = async (
  req,
  res,
  next
) => {

  try {

    const { status } = req.body;


    // ==========================================
    // ALLOWED PAYMENT STATUSES
    // ==========================================

    const allowedStatuses = [
      "pending",
      "paid",
      "failed",
      "refunded"
    ];


    if (!allowedStatuses.includes(status)) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid payment status"

      });

    }


    // ==========================================
    // FIND ORDER
    // ==========================================

    const order =
      await Order.findById(
        req.params.id
      );


    if (!order) {

      return res.status(404).json({

        success: false,

        message:
          "Order not found"

      });

    }


    // ==========================================
    // CHECK PAYMENT
    // ==========================================

    if (!order.payment) {

      return res.status(400).json({

        success: false,

        message:
          "Payment information not found"

      });

    }


    // ==========================================
    // UPDATE PAYMENT STATUS
    // ==========================================

    order.payment.status = status;


    await order.save();


    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({

      success: true,

      message:
        `Payment marked as ${status}`,

      data: order

    });


  } catch (err) {

    console.error(
      "UPDATE PAYMENT STATUS ERROR:",
      err
    );

    next(err);

  }

};