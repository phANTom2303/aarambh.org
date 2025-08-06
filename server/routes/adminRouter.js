const express = require('express');
const adminRouter = express.Router();
const { handleUserLogin, handleVerifyToken, handleUserLogout } = require("../controllers/adminHandler");

adminRouter.get("/login", handleUserLogin);
adminRouter.get("/verify", handleVerifyToken);
adminRouter.post("/logout", handleUserLogout);
module.exports = adminRouter;