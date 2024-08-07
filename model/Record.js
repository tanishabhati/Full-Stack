const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    scholarId: {
        type: String,
        required: true
    },
    hostel: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ['entry', 'exit']
    },
    time: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

module.exports = mongoose.model('Record', RecordSchema);