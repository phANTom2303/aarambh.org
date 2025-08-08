const mongoose = require('mongoose');
const Admin = require('../models/adminModel');
const { validateToken } = require('../services/authTokens')

async function handleUserLogin(req, res) {
    console.log(req.body);
    const { name, password } = req.query || req.body;
    console.log(`name = ${name}, password = ${password}`);
    await Admin.verifyPasswordAndGenerateToken(name, password)
        .then((result) => {
            const { token, name } = result;
            // Step 1: Attach the cookie to res
            res.cookie("token", token, {
                httpOnly: true, // Prevents XSS attacks
                secure: true, // Set to true in production with HTTPS
                sameSite: 'lax', // Allows cross-origin requests
                maxAge: 30 * 24 * 60 * 60 * 1000 // 24 hours
            });

            // Step 2: Prepare the response data
            const responseData = { "msg": "login successfull", "name": name };

            // Step 3: Log the response object
            console.log("Cookie verification:", {
                cookieHeader: res.getHeader ? res.getHeader('Set-Cookie') : (res._headers && res._headers['set-cookie']),
                data: responseData
            });

            // Step 4: Return the response
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
        // Clear the 'token' cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: false,
            sameSite: 'lax'
        });

        // Send success response
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