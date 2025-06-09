const mongoose = require("mongoose");

// Helper function to format a Date object to "YYYY-MM-DD" string
function formatDateToYYYYMMDD(date) {
    if (!date) {
        return undefined; // Return undefined or null if the date is not set
    }
    const d = new Date(date);
    // Ensure the date is valid
    if (isNaN(d.getTime())) {
        return undefined; // Or handle as an invalid date string
    }
    // Use UTC methods to get the date parts to avoid timezone issues
    // if the time component is not relevant (e.g., T00:00:00.000Z)
    const year = d.getUTCFullYear();
    const month = ('0' + (d.getUTCMonth() + 1)).slice(-2); // getUTCMonth() is 0-indexed
    const day = ('0' + d.getUTCDate()).slice(-2);
    return `${year}-${month}-${day}`;
}

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