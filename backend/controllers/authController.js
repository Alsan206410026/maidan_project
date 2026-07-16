const User = require("../model/User.js");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendEmail.js");

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "20d",
    });
};

// Register user
const registerUser = async (req, res) => {
    const { fullName, username, email, phoneNumber, password, confirmPassword } = req.body;

    try {
        // TODO: check if the email is already taken
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // TODO: check confirm password
        if (password !== confirmPassword) {
            return res.status(400).json({
                message: "Passwords do not match",
            });
        }

        // TODO: Hash the password before saving to the database
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // TODO: validate the email and phone number format
        const emailValidate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneValidate = /^\d{10}$/;

        if (!emailValidate.test(email)) {
            return res.status(400).json({
                message: "Invalid email format",
            });
        }

        if (!phoneValidate.test(phoneNumber)) {
            return res.status(400).json({
                message: "Invalid phone number format",
            });
        }

        // TODO: validate the password strength
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message:
                    "Password does not meet strength requirements. It must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.",
            });
        }

        // TODO: check if the username is already taken
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({
                message: "Username already taken",
            });
        }

       
        // TODO: verify OTP
      

        const user = await User.create({
            fullName,
            username,
            email,
            phoneNumber,
            password: hashedPassword,
        });

        if (user) {
            // Generate OTP
            const OTP = crypto.randomInt(100000, 1000000).toString();

            // OTP expires in 10 minutes
            const otpExpires = new Date();
            otpExpires.setMinutes(otpExpires.getMinutes() + 10);

            // Message
            const message = `
                        Welcome to our platform Maidan ${fullName}! Your registration was successful.
                        Your OTP for registration is: ${OTP}. It will expire in 10 minutes.
                        `;

            // Send email  // TODO: SEND OTP   // TODO: Send welcome email
            await sendEmail(email, "Welcome to our platform Maidan", message);

            return res.status(201).json({
                _id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            return res.status(400).json({
                message: "Invalid user data",
            });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Login user
const loginUser = async (req, res) => {}


module.exports = { registerUser, loginUser };