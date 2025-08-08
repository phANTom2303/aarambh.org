const { validateToken } = require("../services/authTokens");

async function onlyAllowAuthenticatedAdmins(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ "msg": "No cookie found for request verification" });
    }

    try {
        const payload = validateToken(token);

        // Attach user info to request object for use in protected routes
        req.user = {
            _id: payload._id,
            name: payload.name
        };
        console.log(`Authenticated user ${payload.name} accessing: ${req.method} ${req.originalUrl}`);

        next();

    } catch (error) {
        console.error('Authentication middleware error:', error);
        return res.status(401).json({ "msg": "request verification failed, unauthorized access" });
    }
}

module.exports = {
    onlyAllowAuthenticatedAdmins,
}