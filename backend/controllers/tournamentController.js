const Tournament = require("../model/Tournament.js");
const cloudinary = require("../config/cloudinary.js");

// Get all tournaments
const getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    return res.status(200).json(tournaments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Get tournament by ID
const getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    return res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Search tournaments
const searchTournaments = async (req, res) => {
  try {
    const { query } = req.query;

    const tournaments = await Tournament.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
        { sport: { $regex: query, $options: "i" } },
      ],
    });

    return res.status(200).json(tournaments);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Create tournament
const createTournament = async (req, res) => {
  try {
    let {
      name,
      description,
      sport,
      pricePool,
      pricePerTeam,
      startDate,
      endDate,
      venue,
      contact,
      location,
      status,
    } = req.body;

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }

    if (!name || !startDate || !endDate || !venue || !contact || !location || !status || !sport) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const newTournament = await Tournament.create({
      name,
      description,
      sport,
      pricePool,
      pricePerTeam,
      startDate,
      endDate,
      venue,
      location,
     contact,
      status,
      images: imageUrl,
    });

    return res.status(201).json(newTournament);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Update tournament
const updateTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    tournament.name = req.body.name || tournament.name;
    tournament.description = req.body.description || tournament.description;
    tournament.sport = req.body.sport || tournament.sport;
    tournament.pricePool = req.body.pricePool || tournament.pricePool;
    tournament.pricePerTeam = req.body.pricePerTeam || tournament.pricePerTeam;
    tournament.startDate = req.body.startDate || tournament.startDate;
    tournament.endDate = req.body.endDate || tournament.endDate;
    tournament.venue = req.body.venue || tournament.venue;
    tournament.location = req.body.location || tournament.location;
    tournament.status = req.body.status || tournament.status;
    tournament.contact = req.body.contact || tournament.contact;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      tournament.images = result.secure_url;
    }

    await tournament.save();

    return res.status(200).json(tournament);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Delete tournament
const deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);

    if (!tournament) {
      return res.status(404).json({
        message: "Tournament not found",
      });
    }

    return res.status(200).json({
      message: "Tournament removed successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllTournaments,
  getTournamentById,
  searchTournaments,
  createTournament,
  updateTournament,
  deleteTournament,
};