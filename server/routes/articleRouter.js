const express = require('express');
const articleRouter = express.Router();
const {getAllArticles, createArticle, updateArticle, deleteArticle} = require("../controllers/articleHandler");

articleRouter.get("/", getAllArticles);
articleRouter.post("/", createArticle);

articleRouter.patch("/:id",updateArticle);
articleRouter.delete("/:id",deleteArticle);


module.exports = articleRouter;