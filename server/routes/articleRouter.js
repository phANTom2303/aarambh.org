const express = require('express');
const multer = require('multer');
const path = require('path');
const articleRouter = express.Router();
const { getAllArticles, getListArticles, getArticleById, getCarouselArticles, createArticle, updateArticle, deleteArticle } = require("../controllers/articleHandler");
const { onlyAllowAuthenticatedAdmins } = require('../middlewares/authenticationCheck');
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
    },
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB limit per file
        files: 11 // Maximum 11 files (1 hero + 10 carousel)
    }
});

articleRouter.get("/", onlyAllowAuthenticatedAdmins, getAllArticles);
articleRouter.get("/list", getListArticles);
articleRouter.get("/carousel", getCarouselArticles);
articleRouter.get("/:id", getArticleById);


articleRouter.post("/", onlyAllowAuthenticatedAdmins, upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'carouselImages', maxCount: 10 }
]), createArticle);

articleRouter.patch("/imageTest", onlyAllowAuthenticatedAdmins, (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.json({ "msg": "compare outputs in terminal" });
})

articleRouter.patch("/:id", onlyAllowAuthenticatedAdmins, upload.fields([
    { name: 'heroImage', maxCount: 1 },
    { name: 'carouselImages', maxCount: 10 }
]), updateArticle);

// articleRouter.patch("/:id", onlyAllowAuthenticatedAdmins, upload.single('heroImage'), updateArticle);
articleRouter.delete("/:id", onlyAllowAuthenticatedAdmins, deleteArticle);


module.exports = articleRouter;