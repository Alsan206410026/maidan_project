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

// Get a venue by ID 
const getVenueById = async (req, res) => {
    const { id } = req.params;
    try {
        const venue = await Venue.findById(id);
        if (!venue) {
            return res.status(404).json({
                message: "Venue not found",
            });
        }
        return res.status(200).json(venue);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

//Search Venues by name or category or price or location
const SearchVenues = async (req, res) => {
    const { query } = req.query;
    try {
        const venues = await Venue.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { category: { $regex: query, $options: "i" } },
                { price: { $regex: query, $options: "i" } },
                { location: { $regex: query, $options: "i" } }
            ]
        });
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

// Update a venue
const updateVenue = async (req, res) => {
    const { name, slug, description, category, price, status } = req.body;
    const venue = await Venue.findById(req.params.id);
    if(venue){
        venue.name = name || venue.name;
        venue.slug = slug || venue.slug;
        venue.description = description || venue.description;
        venue.category = category || venue.category;
        venue.price = price || venue.price;
        venue.status = status || venue.status;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            venue.images = result.secure_url; // Update the image URL in the database
        }
        await venue.save();
        return res.status(200).json(venue);
    }
    return res.status(404).json({
        message: "Venue not found",
    });
};

// Delete a venue
const deleteVenue = async (req, res) => {
    try {
        const venue = await Venue.findByIdAndDelete(req.params.id);

        if (!venue) {
            return res.status(404).json({
                message: "Venue not found",
            });
        }

        return res.status(200).json({
            message: "Venue removed successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};


module.exports = {
    getVenues,
    createVenue,
    getVenueById,
    updateVenue,
    deleteVenue,
    SearchVenues
};