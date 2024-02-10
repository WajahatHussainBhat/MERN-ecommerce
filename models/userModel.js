const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: 'string',
        required: true,
        trim: true
    },
    email: {
        type: 'string',
        required: true,
        unique: true
    },
    password: {
        type: 'string',
        required: true
    },
    phone: {
        type: 'string',
        required: true
    },
    address: {
        type: {},
        required: true
    },
    answer: {
        type: 'string',
        required: true
    },
    role: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

const User = mongoose.model('users', userSchema);

module.exports = User;