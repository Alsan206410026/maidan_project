const mongoose = require("mongoose");
const tournamentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    sport: {
        type: String,
        required: false,
    },
    pricePool: {
        type: Number,
        required: false,
    },
    pricePerTeam: {
        type: Number,
        required: false,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },

    location: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["upcoming", "ongoing"],
        default: "upcoming",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    images: {
        type: String,
        required: false,
    }
});
module.exports = mongoose.model("Tournament", tournamentSchema);