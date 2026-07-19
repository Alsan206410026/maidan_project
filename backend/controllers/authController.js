const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");

// Generate JWT
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: "20d",
        }
    );
};

// ========================= REGISTER USER =========================
const registerUser = async (req, res) => {
    const {
        fullName,
        username,
        email,
        phoneNumber,
        password,
        confirmPassword,
    } = req.body;

    try {

        // Check email
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Check username
        const existingUsername = await User.findOne({ username });

        if (existingUsername) {
            return res.status(400).json({
                message: "Username already taken",
            });
        }

        // Confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        // Validate email
        const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailValidate.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        // Validate phone number
        const phoneValidate = /^\d{10}$/;

        if (!phoneValidate.test(phoneNumber)) {
            return res.status(400).json({
                message: "Invalid phone number format",
            });
        }

        // Validate password
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = crypto.randomInt(100000, 1000000).toString();

        // OTP expires after 10 minutes
        const otpExpires = Date.now() + 10 * 60 * 1000;

        // Store everything in session
        req.session.userData = {
            fullName,
            username,
            email,
            phoneNumber,
            password: hashedPassword,
        };

        req.session.otp = otp;
        req.session.otpExpires = otpExpires;
        req.session.otpcount = 0; // Initialize OTP attempt count

        // Send OTP email
        const message = `
Welcome ${fullName},

Your OTP for email verification is:

${otp}

This OTP will expire in 10 minutes.
`;

        await sendEmail(
            email,
            "Email Verification OTP",
            message
        );

        console.log(`OTP for ${email}: ${otp}`);// For testing purposes, log the OTP to the console

        return res.status(200).json({
            message: "OTP sent successfully. Please verify your email.",
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};
// verify OTP
const verifyOtp = async (req, res) => {
    const { otp } = req.body;

    try {

        // Check if session exists
        if (!req.session.userData) {
            return res.status(400).json({
                message: "Registration session expired. Please register again.",
            });
        }

        // Check OTP
        if (!otp) {
            return res.status(400).json({
                message: "OTP is required",
            });
        }

        // Check OTP expiry
        if (Date.now() > req.session.otpExpires) {

            // Destroy expired session
            req.session.destroy((err) => {
                if (err) {
                    console.log(err);
                }
            });

            return res.status(400).json({
                message: "OTP has expired. Please register again.",
            });
        }

        // Compare OTP
        if (otp !== req.session.otp) {
            req.session.otpcount += 1;
            if (req.session.otpcount >= 3) {
                req.session.destroy((err) => {
                    if (err) {
                        console.log(err);
                    }
                });
                return res.status(400).json({
                    message: "Too many failed OTP attempts. Please register again.",
                });
            }
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }

        // Create user after successful OTP verification
        const user = await User.create({
            fullName: req.session.userData.fullName,
            username: req.session.userData.username,
            email: req.session.userData.email,
            phoneNumber: req.session.userData.phoneNumber,
            password: req.session.userData.password,
            verified: true,
        });

        // Destroy session after successful registration
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
            }
        });

        return res.status(201).json({
            message: "Registration successful",

            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
};
// login user
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {

        // Check username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }
        if (!user.verified) {
            return res.status(401).json({
                message: "Please verify your email before logging in.",
            });
        }

        if(user.status === "blocked") {
            return res.status(403).json({
                message: "Your account has been blocked. Please contact support.",
            });
        }
        if (user.status === "suspended") {
            return res.status(403).json({
                message: "Your account has been suspended. Please contact support.",
            });
        }

        if (user.status === "active") {
             // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid username or password",
            });
        }

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber,
            token: generateToken(user._id),
        });
        
        }
        else {
            return res.status(403).json({
                message: "Your account is not active. Please contact support.",
            });
        }

       

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

// get all users (for super admin)
const getUsers = async (req, res) => {

    try {

        const users = await User.find().select("-password");

        return res.status(200).json(users);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

module.exports = {
    registerUser,
    verifyOtp,
    loginUser,
    getUsers,
};