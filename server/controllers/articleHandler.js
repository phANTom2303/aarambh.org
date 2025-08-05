const mongoose = require('mongoose');
const Article = require('../models/articleModel');
const { uploadImage } = require("../services/cloudinary.js");

async function getAllArticles(req, res) {
    const articles = await Article.find({});
    return res.json(articles);
}

async function createArticle(req, res) {
    // Text fields are available in req.body
    const title = req.body.title;
    const eventDate = req.body.eventDate;
    const overview = req.body.overview;

    // File is available in req.file (since you used upload.single('heroImage'))
    const uploadedFile = req.file;
    const heroImageBuffer = uploadedFile.buffer;

    try {
        const cloudinaryResult = await uploadImage(heroImageBuffer);
        const heroImage = cloudinaryResult.url;
        console.log("Successfully uploaded to Cloudinary:", cloudinaryResult.url);
        try {
            await Article.create({
                title, eventDate, heroImage, overview,
            });
            return res.status(201).json({
                "msg": `Article ${title} creted successfully`,
            });
        } catch (err) {
            if (err.name === 'ValidationError') {
                return res.status(400).json({
                    "msg": "Validation error creating article",
                    "errors": err.errors
                });
            }

            return res.status(500).json({ "msg": "Error creating article. Please try again." });
        }
    } catch (error) {
        // Fallback to local file serving
        console.log("Cloudinary upload failed, using local storage:", error.message);
    }



}

async function updateArticle(req, res) {
    const { id } = req.params;
    console.log(`Updating article ${id}`);
    const title = req.body.title;
    const eventDate = req.body.eventDate;
    const overview = req.body.overview;

    let updateData = { title, eventDate, overview };

    // File is available in req.file (since you used upload.single('heroImage'))
    const uploadedFile = req.file;

    if (uploadedFile) {
        const heroImageBuffer = uploadedFile.buffer;
        try {
            const cloudinaryResult = await uploadImage(heroImageBuffer);
            updateData.heroImage = cloudinaryResult.url;
            console.log("Successfully uploaded to Cloudinary:", cloudinaryResult.url);
        } catch (error) {
            console.log("Cloudinary upload failed:", error.message);
            return res.status(500).json({ "msg": "Error uploading image. Please try again." });
        }
    }


    try {
        const updatedArticle = await Article.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true },
        );

        if (updatedArticle)
            return res.status(203).json({ "msg": `Article updated successfullt : ${updatedArticle}` });
        else
            return res.status(400).json({ "error": "article doesn not exist" });

    } catch (err) {
        console.error("Error updating member:", error);
        return res.status(500).json({ "msg": "Error updating member. Please try again." });
    }
}

async function deleteArticle(req, res) {
    const { id } = req.params;
    try {
        const deletedArticle = await Article.findByIdAndDelete(id);
        if (deletedArticle)
            return res.status(200).json({ "msg": "article deleted successfully", "article": deletedArticle });
        else
            return res.status(400).json({ "msg": "No such article exists" });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ "msg": "error deleting this article", "error": err });
    }
}

module.exports = {
    getAllArticles,
    createArticle,
    updateArticle,
    deleteArticle,
}