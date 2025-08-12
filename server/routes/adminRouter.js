const express = require('express');
const adminRouter = express.Router();
const { handleUserLogin, handleVerifyToken, handleUserLogout } = require("../controllers/adminHandler");
const { rateLimiter } = require('../services/rateLimiting');
adminRouter.get("/login", rateLimiter, handleUserLogin);
adminRouter.get("/verify", handleVerifyToken);
adminRouter.post("/logout", rateLimiter, handleUserLogout);
module.exports = adminRouter;