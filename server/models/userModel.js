const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,

    },
    lastName: {
        type: String,
        required: true,

    },
    emailAddress: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    earnedPoints: {
        type: String,
        required: false,
    },
    role: {
        type: String,
        required: true,
        default: "patron", // patron, admin, librarian
    },
    status: {
        type: String,
        required: true,
        default: "pending", // active, inactive or pending
    },
    country: {
        type: String,
        required: false,
    },
    points: {
        type: Number,
        required: false,
        default: 0
    },
}, { timestamps: true });

module.exports = mongoose.model("users", userSchema);