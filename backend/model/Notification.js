const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
{
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    venue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue"
    },

    booking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
    },

    title: {
        type: String,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    type: {
        type: String,
        enum: [
            "Booking",
            "Payment",
            "Cancellation",
            "Tournament",
            "General"
        ],
        default: "General"
    },

    read: {
        type: Boolean,
        default: false
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Notification", notificationSchema);