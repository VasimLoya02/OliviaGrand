const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({

    // ==========================================
    // USER NAME
    // ==========================================

    name: {
        type: String,
        required: true
    },


    // ==========================================
    // EMAIL
    // ==========================================

    email: {
        type: String,
        required: true,
        unique: true
    },


    // ==========================================
    // PASSWORD
    // ==========================================

    password: {
        type: String,
        required: true
    },


    // ==========================================
    // PHONE
    // ==========================================

    phone: {
        type: String,
        default: ""
    },


    // ==========================================
    // SAVED ADDRESS
    // ==========================================

    address: {

        line1: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        }

    },


    // ==========================================
    // LOYALTY POINTS
    // ==========================================

    loyaltyPoints: {
        type: Number,
        default: 0
    },


    // ==========================================
    // USER ROLE
    // ==========================================

    role: {
        type: String,
        enum: [
            "customer",
            "admin",
            "staff",
            "kitchen",
            "delivery"
        ],
        default: "customer"
    },


    // ==========================================
    // ACCOUNT ACTIVE / INACTIVE
    // ==========================================

    isActive: {
        type: Boolean,
        default: true
    }

});


// ==========================================
// PASSWORD HASHING
// ==========================================

userSchema.pre("save", async function () {

    if (!this.isModified("password")) {
        return;
    }

    this.password = await bcrypt.hash(
        this.password,
        10
    );

});


// ==========================================
// MATCH PASSWORD
// ==========================================

userSchema.methods.matchPassword = async function (
    enteredPassword
) {

    return await bcrypt.compare(
        enteredPassword,
        this.password
    );

};


module.exports = mongoose.model(
    "User",
    userSchema
);

