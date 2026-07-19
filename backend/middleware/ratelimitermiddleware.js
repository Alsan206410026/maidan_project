const rateLimit = require("express-rate-limit");

// Login Limiter
const loginLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 50,
    message: {
        message: "Too many login requests. Please try again after 1 minute.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});

// Register Limiter
const registerLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: {
        message: "Too many registration requests. Please try again after 1 minute.",
    },
    standardHeaders: true,
    legacyHeaders: false,
});


module.exports = {
    loginLimiter,
    registerLimiter
};