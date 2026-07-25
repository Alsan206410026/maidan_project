const express = require("express");
const { superAdmin } = require("../middleware/superAdminmiddleware");
const router = express.Router();
const { createTournament, getAllTournaments, getTournamentById, updateTournament, deleteTournament, searchTournaments } = require("../controllers/tournamentController.js");
const { protect } = require("../middleware/authmiddleware");
const  upload = require("../middleware/tournamentsMiddleware.js");

router.route('/').get(getAllTournaments).post(protect,superAdmin, upload.single("image"), createTournament);
router.route('/search').get(searchTournaments);
router.route('/:id').get(getTournamentById).put(protect, superAdmin, upload.single("image"), updateTournament).delete(protect, superAdmin, deleteTournament);

module.exports = router;