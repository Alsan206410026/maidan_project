const Venue = require("../model/Venue.js");
const Category = require("../model/VenueCategory.js");
const cloudinary = require("../config/cloudinary.js");

// Get all venues
const getVenues = async (req, res) => {
    try {
        const venues = await Venue.find().populate("category", "name slug");

        return res.status(200).json(venues);
    } catch (error) {
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
    const location = req.query.location?.trim();
    const sport = req.query.sport?.trim();

    try {
        const filter = {};

        // Location only: return every category in that location
        if (location) {
            filter.location = {
                $regex: location, //regex do like if user search loc it will return all location which  contains loc in it.
                $options: "i",
            };
        }

        // Sport only: return that sport in every location
        if (sport) {
            const categoryIds = await Category.find({
                name: { $regex: sport, $options: "i" },
            }).distinct("_id");

            filter.category = {
                $in: categoryIds,
            };
        }

        const venues = await Venue.find(filter).populate("category", "name slug");

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
    const { name, slug, description, category, price, status, location, admin } = req.body;


    let imageUrl = ''


    try {


        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imageUrl = result.secure_url; // when you upload image to cloudinary, it will return a secure_url which is the URL of the uploaded image
        }

        if (!name || !slug || !description || !category || !price || !status || !location || !imageUrl || !admin) {
            return res.status(400).json({
                message: "Please fill all the fields",
            });
        }


        const newVenue = await Venue.create({
            name,
            slug,
            description,
            category,
            price,
            status,
            images: imageUrl, // Save the image URL in the database
            location,
            admin
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
    const { name, slug, description, category, price, status, location, admin } = req.body;
    const venue = await Venue.findById(req.params.id);
    if (venue) {
        venue.name = name || venue.name;
        venue.slug = slug || venue.slug;
        venue.description = description || venue.description;
        venue.category = category || venue.category;
        venue.price = price || venue.price;
        venue.status = status || venue.status;
        venue.location = location || venue.location;
        venue.admin = admin || venue.admin; // Update the admin to the provided value if given
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


// Update a venue by admin
const updateVenueByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, slug, description, price, status, location } = req.body;

    const existingVenue = await Venue.findById(id);
    if (!existingVenue) {
      return res.status(404).json({ message: "Venue not found" });
    }

    // Determine target slug safely
    let targetSlug = existingVenue.slug;
    if (slug && slug.trim() !== "") {
      targetSlug = slug;
    } else if (name) {
      targetSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    }

    // Check if another venue (different _id) already uses this slug
    const duplicateSlug = await Venue.findOne({
      slug: targetSlug,
      _id: { $ne: id }, // Exclude current venue
    });

    if (duplicateSlug) {
      return res.status(400).json({
        message: `The slug "${targetSlug}" is already in use by another venue. Please pick a different name or slug.`,
      });
    }

    // Apply basic updates
    existingVenue.name = name || existingVenue.name;
    existingVenue.slug = targetSlug;
    existingVenue.description = description || existingVenue.description;
    existingVenue.price = price || existingVenue.price;
    existingVenue.status = status || existingVenue.status;
    existingVenue.location = location || existingVenue.location;

    // Handle Cloudinary upload if a file was provided
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      existingVenue.images = result.secure_url;
    }

    // Save changes regardless of whether a new image was uploaded
    const updatedVenue = await existingVenue.save();

    return res.status(200).json({
      success: true,
      data: updatedVenue,
    });
  } catch (error) {
    console.error("Error updating venue:", error);
    return res.status(500).json({ message: error.message || "Server Error" });
  }
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


    const getAdminVenues = async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized: User payload missing",
                });
            }

            const userId = req.user._id || req.user.id;


            const venue = await Venue.findOne({ admin: userId })
                .populate("category", "name slug")
                .populate("admin", "fullName email role");

            if (!venue) {
                return res.status(404).json({
                    success: false,
                    message: "No venue found for this admin user.",
                });
            }

            return res.status(200).json({
                success: true,
                message: "Venue fetched successfully",
                data: venue,
            });
        } catch (error) {
            console.error("Error fetching admin venue:", error);
            return res.status(500).json({
                success: false,
                message: "Server error while fetching venue",
                error: error.message,
            });
        }
    };


    module.exports = {
        getVenues,
        createVenue,
        getVenueById,
        updateVenue,
        deleteVenue,
        SearchVenues,
        updateVenueByAdmin,
        getAdminVenues
    };