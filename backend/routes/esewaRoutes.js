const express = require("express");
const router = express.Router();

const {
  initiatePayment,
  paymentSuccess,
  paymentFailure,
  checkPaymentStatus,
} = require("../controllers/esewaController");

const { protect } = require("../middleware/authmiddleware");


// Initiate eSewa Payment

router.post("/initiate", protect, initiatePayment);


// Payment Success Callback

router.get( "/success", paymentSuccess);


// Payment Failure Callback

router.get("/failure", paymentFailure);


// Check Payment Status

router.get("/status/:bookingId",protect, checkPaymentStatus);

module.exports = router;