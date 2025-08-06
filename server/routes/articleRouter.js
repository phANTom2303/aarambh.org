const express = require('express');
const multer = require('multer');
const path = require('path');
const articleRouter = express.Router();
const { getAllArticles,getListArticles,  getArticleById, getCarouselArticles, createArticle, updateArticle, deleteArticle } = require("../controllers/articleHandler");

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Only allow image files
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

articleRouter.get("/", getAllArticles);
articleRouter.get("/list", getListArticles);
articleRouter.get("/carousel", getCarouselArticles);
articleRouter.get("/:id", getArticleById);
articleRouter.post("/", upload.single('heroImage'), createArticle);


articleRouter.post("/test", upload.single('heroImage'), (req, res) => {
    try {
        console.log('Request body:', req.body);
        console.log('Uploaded file:', req.file);


        // Access the form data
        const { title, eventDate, overview, topics, sections } = req.body;

        // Parse JSON strings back to objects/arrays
        const parsedTopics = JSON.parse(topics || '[]');
        const parsedSections = JSON.parse(sections || '[]');

        // Access file information
        const heroImage = req.file ? {
            filename: req.file.filename,
            originalName: req.file.originalname,
            path: req.file.path,
            size: req.file.size
        } : null;

        console.log('Parsed data:', {
            title,
            eventDate,
            overview,
            topics: parsedTopics,
            sections: parsedSections,
            heroImage
        });

        res.json({
            message: 'Article data received successfully',
            data: {
                title,
                eventDate,
                overview,
                topics: parsedTopics,
                sections: parsedSections,
                heroImage
            }
        });

    } catch (error) {
        console.error('Error processing article:', error);
        res.status(500).json({ error: 'Failed to process article data' });
    }
});


articleRouter.patch("/imageTest", (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.json({ "msg": "compare outputs in terminal" });
})

articleRouter.patch("/:id", upload.single('heroImage'), updateArticle);
articleRouter.delete("/:id", deleteArticle);


module.exports = articleRouter;