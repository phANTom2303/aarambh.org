const mongoose = require('mongoose');
const Article = require('../models/articleModel');

async function getAllArticles(req, res) {
    const articles = await Article.find({});
    return res.json(articles);
}

async function createArticle(req, res) {
    const { title, eventDate, heroImage, overview, topics, sections } = req.body;
    try {
        await Article.create({
            title, eventDate, heroImage, overview, topics, sections,
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
}

async function updateArticle(req, res) {
    const { id } = req.params;
    const updateData = req.body;
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