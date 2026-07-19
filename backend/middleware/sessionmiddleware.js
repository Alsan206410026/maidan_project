const session = require("express-session");

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        maxAge: 15 * 60 * 1000, // 15 minutes
        httpOnly: true,
        secure: false, // true only when using HTTPS in production
    },
});

module.exports = sessionMiddleware;