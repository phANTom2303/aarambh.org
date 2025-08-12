const mongoose = require('mongoose');
require('dotenv').config();
const { formatDateToYYYYMMDD } = require('./modelUtilities');

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true, // Removes whitespace from both ends of a string
    },
    eventDate: {
        type: Date,
        required: true,
        get: formatDateToYYYYMMDD,
    },
    heroImage: {
        type: String, // URL or path to the image
        required: true,
    },
    overview: {
        type: String,
        required: true,
    },
    carousel: {
        type: [String],
        required: false,
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
});
articleSchema.index({ eventDate: -1, _id: -1 });
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;