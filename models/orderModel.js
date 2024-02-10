/* eslint-disable indent */
const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    products: [{
        type: mongoose.ObjectId,
        ref: "products",
    }, ],
    payment: {},
    buyer: {
        type: mongoose.ObjectId,
        ref: "users",
    },
    status: {
        type: String,
        default: "Not Process",
        enum: ["Not Process", "Processing", "Shipped", "delivered", "cancel"],
    },
}, { timestamps: true });

const category = mongoose.model("orders", orderSchema);

module.exports = category;