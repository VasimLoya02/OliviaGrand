const jwt = require('jsonwebtoken');
const User = require('../models/User');


// ==========================================
// GENERATE JWT TOKEN
// ==========================================

const generateToken = (id, role) =>
  jwt.sign(
    { id, role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );


// ==========================================
// REGISTER
// ==========================================

exports.register = async (req, res, next) => {

  try {

    const {
      name,
      email,
      password,
      phone,
      address,
      city
    } = req.body;


    // ==========================================
    // VALIDATE REQUIRED FIELDS
    // ==========================================

    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: 'Name, email and password are required'
      });

    }


    // ==========================================
    // CHECK EXISTING USER
    // ==========================================

    const userExists =
      await User.findOne({ email });


    if (userExists) {

      return res.status(400).json({
        success: false,
        message: 'Email already registered'
      });

    }


    // ==========================================
    // CREATE USER
    // ==========================================

    const user = await User.create({

      name,

      email,

      password,

      phone: phone || '',

      address: {
        line1: address || '',
        city: city || ''
      }

    });


    // ==========================================
    // GENERATE TOKEN
    // ==========================================

    const token =
      generateToken(
        user._id,
        user.role
      );


    // ==========================================
    // RESPONSE
    // ==========================================

    res.status(201).json({

      success: true,

      data: {

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          phone: user.phone,

          role: user.role,

          loyaltyPoints:
            user.loyaltyPoints,

          address:
            user.address

        },

        token

      }

    });

  } catch (err) {

    next(err);

  }

};


// ==========================================
// LOGIN
// ==========================================

exports.login = async (req, res, next) => {

  try {

    const {
      email,
      password
    } = req.body;


    // ==========================================
    // FIND USER
    // ==========================================

    const user =
      await User.findOne({ email })
        .select('+password');


    // ==========================================
    // CHECK PASSWORD
    // ==========================================

    if (
      !user ||
      !(await user.matchPassword(password))
    ) {

      return res.status(401).json({

        success: false,

        message: 'Invalid credentials'

      });

    }


    // ==========================================
    // GENERATE TOKEN
    // ==========================================

    const token =
      generateToken(
        user._id,
        user.role
      );


    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({

      success: true,

      data: {

        user: {

          id: user._id,

          name: user.name,

          email: user.email,

          phone: user.phone,

          role: user.role,

          loyaltyPoints:
            user.loyaltyPoints,

          address:
            user.address || {
              line1: '',
              city: ''
            }

        },

        token

      }

    });

  } catch (err) {

    next(err);

  }

};


// ==========================================
// GET CURRENT USER
// ==========================================

exports.getMe = async (req, res, next) => {

  try {

    const user =
      await User.findById(
        req.user._id
      ).select('-password');


    if (!user) {

      return res.status(404).json({

        success: false,

        message: 'User not found'

      });

    }


    res.json({

      success: true,

      data: user

    });

  } catch (err) {

    next(err);

  }

};


// ==========================================
// UPDATE USER ADDRESS
// ==========================================

exports.updateAddress = async (
  req,
  res,
  next
) => {

  try {

    const {
      line1,
      city
    } = req.body;


    // ==========================================
    // VALIDATE ADDRESS
    // ==========================================

    if (!line1 || !city) {

      return res.status(400).json({

        success: false,

        message:
          'Address and city are required'

      });

    }


    // ==========================================
    // FIND LOGGED-IN USER
    // ==========================================

    const user =
      await User.findById(
        req.user._id
      );


    if (!user) {

      return res.status(404).json({

        success: false,

        message: 'User not found'

      });

    }


    // ==========================================
    // SAVE ADDRESS
    // ==========================================

    user.address = {

      line1: line1.trim(),

      city: city.trim()

    };


    await user.save();


    // ==========================================
    // RESPONSE
    // ==========================================

    res.json({

      success: true,

      message:
        'Address saved successfully',

      data: {

        address:
          user.address

      }

    });

  } catch (err) {

    next(err);

  }

};

