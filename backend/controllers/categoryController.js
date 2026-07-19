const category = require("../model/VenueCategory.js");

// get Venue Categories
const getVenueCategories = async (req, res) => {
    try {
        const categories = await category.find();
        return res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

//get Venue Category by ID
const getVenueCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await category.findById(id);
        if (!category) {
            return res.status(404).json({
                message: "Category not found",
            });
        }
        return res.status(200).json(category);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// create Venue Category
const createVenueCategory = async (req, res) => {
    const { name, slug } = req.body;
    if (!name || !slug ) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    try {
        const newCategory = new category({ name, slug });
        const savedCategory = await newCategory.save();
        return res.status(201).json(savedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// update Venue Category
const updateVenueCategory = async (req, res) => {
    const { id } = req.params;
    const { name, slug } = req.body;
    try {
        const updatedCategory = await category.findByIdAndUpdate(id, { name, slug }, { new: true });
        return res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

// delete Venue Category
const deleteVenueCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCategory = await category.findByIdAndDelete(id);
        return res.status(200).json(deletedCategory);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
};

module.exports = {
    getVenueCategories,
    getVenueCategoryById,
    createVenueCategory,
    updateVenueCategory,
    deleteVenueCategory,
};