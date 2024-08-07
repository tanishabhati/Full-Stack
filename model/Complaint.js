const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
    scholarId: {
        type: String,
        required: true
    },
    holderName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['electricity', 'mess', 'water', 'sanitation', 'others']
    },
    upvotes: {
        type: Number,
        required: true,
        default: 1
    },
    hostel: {
        type: String,
        required: true,
        default: 'none'
    },
    content: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default: false
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);