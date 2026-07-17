const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        maxlength: 50
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
});

module.exports = mongoose.model("Category", CategorySchema);