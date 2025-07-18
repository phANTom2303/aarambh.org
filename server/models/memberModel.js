const mongoose = require("mongoose");
const {formatDateToYYYYMMDD} = require('./modelUtilities');
const memberSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
    },
    phoneNum: {
        type: String,
        required: true,
        unique: true,
    },
    dateOfJoin: {
        type: Date,
        required: true,
        get: formatDateToYYYYMMDD, // Apply getter for formatting
    },
    dateOfLeaving: {
        type: Date,
        get: formatDateToYYYYMMDD, // Apply getter for formatting
    }
}, {
    timestamps: true,
    // Ensure getters are applied when converting to JSON or a plain object
    toJSON: { getters: true },
});

const Member = mongoose.model('member', memberSchema);

module.exports = Member;