const Venue = require("../model/Venue.js");
const cloudinary = require("../config/cloudinary.js");

// Get all venues
const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find();
        return res.status(200).json(venues);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// Create a new venue
const createVenue = async (req, res) => {
    const { name, slug, description, category, price, status } = req.body;

    let imageUrl = ''

    if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // when you upload image to cloudinary, it will return a secure_url which is the URL of the uploaded image
        }
            
    try {
        const newVenue = await Venue.create({
            name,
            slug,
            description,
            category,
            price,
            status,
            images: imageUrl, // Save the image URL in the database
        });

        return res.status(201).json(newVenue);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// // Get a venue by searching name,location,category,price,stockQuantity,status,images
// const getVenueBySearch = async (req, res) => {
//     const { id } = req.params;

module.exports = {
    getVenues,
    createVenue,
    // getVenueBySearch
};