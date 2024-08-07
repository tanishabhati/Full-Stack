const mongoose = require('mongoose');

const FineSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    scholarId: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    transactionId: {
        type: String,
        required: true,
        default: 'Not Paid'
    }
});

module.exports = mongoose.model('Fine', FineSchema);