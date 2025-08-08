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
    }
});

articleRouter.get("/", onlyAllowAuthenticatedAdmins, getAllArticles);
articleRouter.get("/list", getListArticles);
articleRouter.get("/carousel", getCarouselArticles);
articleRouter.get("/:id", getArticleById);


articleRouter.post("/", onlyAllowAuthenticatedAdmins, upload.single('heroImage'), createArticle);

articleRouter.patch("/imageTest", onlyAllowAuthenticatedAdmins, (req, res) => {
    console.log(req.body);
    console.log(req.file);
    return res.json({ "msg": "compare outputs in terminal" });
})

articleRouter.patch("/:id", onlyAllowAuthenticatedAdmins, upload.single('heroImage'), updateArticle);
articleRouter.delete("/:id", onlyAllowAuthenticatedAdmins, deleteArticle);


module.exports = articleRouter;