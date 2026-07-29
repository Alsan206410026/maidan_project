const Booking = require("../model/Booking.js");
const Venue = require("../model/Venue.js");
const TimeSlot = require("../model/TimeSlot.js");
const sendEmail = require("../utils/sendEmail.js");
const Notification = require("../model/Notification.js");
const sendNotification = require("../websocket/notificationHandler");

// Get all bookings
const getAllBookings = async (req, res) => {
    try {

        if (req.user.role === "super_admin") {

            const bookings = await Booking.find()
                .populate("user", "fullName email phoneNumber")
                .populate("venue", "name location")
                .populate("slot");

            return res.status(200).json(bookings);

        }

        if (req.user.role === "admin") {

            const venueIds = await Venue.find({
                admin: req.user._id
            }).distinct("_id");

            const bookings = await Booking.find({
                venue: {
                    $in: venueIds
                }
            })
                .populate("user", "fullName email phoneNumber")
                .populate("venue", "name location")
                .populate("slot");

            return res.status(200).json(bookings);

        }

        const bookings = await Booking.find({
            user: req.user._id
        })
            .populate("venue", "name location")
            .populate("slot");

        return res.status(200).json(bookings);

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }
};

// Get booking by ID
const getBookingById = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id)
            .populate("user", "fullName email phoneNumber")
            .populate("venue", "name location price")
            .populate("slot");

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        if (req.user.role === "super_admin") {
            return res.status(200).json(booking);
        }

        const venue = await Venue.findById(booking.venue);

        if (
            req.user.role === "admin" &&
            venue.admin.toString() === req.user._id.toString()
        ) {
            return res.status(200).json(booking);
        }

        if (booking.user._id.toString() === req.user._id.toString()) {
            return res.status(200).json(booking);
        }

        return res.status(403).json({
            message: "Unauthorized"
        });

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};

// Search bookings
const searchBookings = async (req, res) => {

    const venue = req.query.venue?.trim();
    const bookingStatus = req.query.bookingStatus?.trim();
    const paymentStatus = req.query.paymentStatus?.trim();

    try {

        const filter = {};

        if (venue) {

            const venueIds = await Venue.find({
                name: {
                    $regex: venue,
                    $options: "i",
                },
            }).distinct("_id");

            filter.venue = {
                $in: venueIds,
            };

        }

        if (bookingStatus) {
            filter.bookingStatus = bookingStatus;
        }

        if (paymentStatus) {
            filter.paymentStatus = paymentStatus;
        }

        const bookings = await Booking.find(filter)
            .populate("user", "fullName email phoneNumber")
            .populate("venue", "name location price")
            .populate("slot");

        return res.status(200).json(bookings);

    } catch (error) {

        return res.status(500).json({
            message: "Internal Server Error",
        });

    }

};
// Create booking
const createBooking = async (req, res) => {

    const {
        venue,
        slot,
        bookingDate,
        paymentMethod,
    } = req.body;

    try {

        if (!venue || !slot || !bookingDate) {
            return res.status(400).json({
                message: "Please fill all required fields",
            });
        }

        const venueData = await Venue.findById(venue);

        if (!venueData) {
            return res.status(404).json({
                message: "Venue not found",
            });
        }

        const slotData = await TimeSlot.findById(slot);

        if (!slotData) {
            return res.status(404).json({
                message: "Time slot not found",
            });
        }

        const existingBooking = await Booking.findOne({
            venue,
            slot,
            bookingDate,
            bookingStatus: {
                $in: ["Pending", "Confirmed"],
            },
        });

        if (existingBooking) {
            return res.status(400).json({
                message: "Selected slot is already booked",
            });
        }

        const booking = await Booking.create({

            user: req.user._id,
            venue,
            slot,
            bookingDate,
            totalAmount: venueData.price,
            paymentMethod,

        });

        // Create notification in database
        const notification = await Notification.create({

            sender: req.user._id,
            receiver: venueData.admin,
            venue: venueData._id,
            booking: booking._id,
            title: "New Booking",
            message: `${req.user.fullName} booked ${venueData.name} on ${bookingDate}.`,
            type: "Booking"

        });

        // Send email (optional)
        try {

            await sendEmail(

                req.user.email,

                "Booking Confirmation",

                `Dear ${req.user.fullName},

Your booking has been created successfully.

Venue : ${venueData.name}
Booking Date : ${bookingDate}
Amount : Rs. ${venueData.price}

Thank you for choosing Maidan.`

            );

        } catch (err) {

            console.log(err.message);

        }

        // Send real-time notification
        sendNotification(notification);

        return res.status(201).json(booking);

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }

};
// Update booking
const updateBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        booking.bookingStatus =
            req.body.bookingStatus || booking.bookingStatus;

        booking.paymentStatus =
            req.body.paymentStatus || booking.paymentStatus;

        booking.paymentMethod =
            req.body.paymentMethod || booking.paymentMethod;

        booking.transactionId =
            req.body.transactionId || booking.transactionId;

        await booking.save();

        // Save notification
        const notification = await Notification.create({

            sender: req.user._id,
            receiver: booking.user,
            venue: booking.venue,
            booking: booking._id,
            title: "Booking Updated",
            message: `Your booking status is ${booking.bookingStatus}. Payment status is ${booking.paymentStatus}.`,
            type:
                booking.paymentStatus === "Paid"
                    ? "Payment"
                    : "Booking"

        });

        const user = await booking.populate("user", "fullName email");
        const venue = await booking.populate("venue", "name");

        try {

            await sendEmail(

                user.user.email,

                "Booking Updated",

                `Dear ${user.user.fullName},

Your booking has been updated successfully.

Venue : ${venue.venue.name}

Booking Status : ${booking.bookingStatus}

Payment Status : ${booking.paymentStatus}

Thank you for choosing Maidan.`

            );

        } catch (err) {

            console.log(err.message);

        }

        // Send realtime notification
        sendNotification(notification);

        return res.status(200).json(booking);

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }

};


// Cancel/Delete booking
const deleteBooking = async (req, res) => {

    try {

        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                message: "Booking not found",
            });
        }

        booking.bookingStatus = "Cancelled";
        booking.cancelledBy = req.user._id;
        booking.cancellationReason =
            req.body.cancellationReason || "Cancelled by admin";

        await booking.save();

        // Save notification
        const notification = await Notification.create({

            sender: req.user._id,
            receiver: booking.user,
            venue: booking.venue,
            booking: booking._id,
            title: "Booking Cancelled",
            message: `Your booking has been cancelled. Reason: ${booking.cancellationReason}`,
            type: "Cancellation"

        });

        const user = await booking.populate("user", "fullName email");
        const venue = await booking.populate("venue", "name");

        try {

            await sendEmail(

                user.user.email,

                "Booking Cancelled",

                `Dear ${user.user.fullName},

Your booking has been cancelled.

Venue : ${venue.venue.name}

Reason : ${booking.cancellationReason}

Thank you,
Maidan Team.`

            );

        } catch (err) {

            console.log(err.message);

        }

        // Send realtime notification
        sendNotification(notification);

        return res.status(200).json({
            message: "Booking cancelled successfully",
        });

    } catch (error) {

        return res.status(500).json({
            message: error.message,
        });

    }

};


module.exports = {
    getAllBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBooking,
    searchBookings,
};