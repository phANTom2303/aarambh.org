const mongoose = require('mongoose');

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
    }
}, {
    timestamps: true,
    toJSON: { getters: true },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;