const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
require('dotenv').config();
const { validateToken } = require('../services/authTokens')

// Detect if we're in production (more reliable than NODE_ENV)
const isProduction = process.env.NODE_ENV === 'production' ||
    process.env.KOYEB_APP_ID || // Koyeb-specific
    !process.env.PORT?.includes('localhost') ||
    process.env.NODE_ENV !== 'development';

async function handleUserLogin(req, res) {
    console.log(req.body);
    const { name, password } = req.query || req.body;
    console.log(`name = ${name}, password = ${password}`);
    await Admin.verifyPasswordAndGenerateToken(name, password)
        .then((result) => {
            const { token, name } = result;

            // Environment-based cookie configuration
            const cookieOptions = {
                httpOnly: true,
                secure: isProduction, // Auto-detect production
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 30 * 24 * 60 * 60 * 1000
            };

            console.log('Cookie options:', cookieOptions); // Debug log
            res.cookie("token", token, cookieOptions);

            const responseData = { "msg": "login successfull", "name": name };
            return res.json(responseData);
        })
        .catch((error) => {
            return res.status(404).json({ "msg": error.message });
        })
}



async function handleVerifyToken(req, res) {
    console.log(`-----------Token Verification Started--------------------`);
    try {
        // Get token from httpOnly cookie
        const token = req.cookies.token;
        console.log(`Token extracted from cookies : ${token}`)
        if (!token) {
            console.log(`No Token Found`);
            return res.status(401).json({
                success: false,
                msg: "No token provided"
            });
        }

        // Validate the token using your existing utility
        const payload = validateToken(token);
        console.log(`Payload : ${payload}`);
        // Token is valid, return user data
        return res.json({
            success: true,
            user: {
                _id: payload._id,
                name: payload.name,
            }
        });

    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({
            success: false,
            msg: "Invalid or expired token"
        });
    }
}

async function handleUserLogout(req, res) {
    try {
        const cookieOptions = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax'
        };

        res.clearCookie("token", cookieOptions);

        return res.json({
            success: true,
            msg: "Logged out successfully"
        });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({
            success: false,
            msg: "Error during logout"
        });
    }
}

module.exports = {
    handleUserLogin,
    handleVerifyToken,
    handleUserLogout
}