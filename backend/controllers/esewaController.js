const Booking = require("../model/Booking");
const Transaction = require("../model/Transaction");
const esewaConfig = require("../config/esewa");
const generateSignature = require("../utils/esewaSignature");
const verifyPayment = require("../utils/esewaVerify");

// ==========================================
// Initiate eSewa Payment
// ==========================================
const initiatePayment = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required.",
      });
    }

    const booking = await Booking.findById(bookingId)
      .populate("transaction")
      .populate("venue", "name")
      .populate("user", "fullName email phoneNumber");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    if (!booking.transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }

    if (booking.transaction.payment_gateway !== "esewa") {
      return res.status(400).json({
        success: false,
        message: "This booking is not an eSewa payment.",
      });
    }

    if (booking.transaction.status === "COMPLETED") {
      return res.status(400).json({
        success: false,
        message: "Payment already completed.",
      });
    }

    const transactionUUID = booking.transaction._id.toString();

    const amount = booking.totalAmount;

    const tax_amount = 0;
    const product_service_charge = 0;
    const product_delivery_charge = 0;

    const total_amount =
      amount +
      tax_amount +
      product_service_charge +
      product_delivery_charge;

    const signed_field_names =
      "total_amount,transaction_uuid,product_code";

    const signature = generateSignature({
      total_amount,
      transaction_uuid: transactionUUID,
      product_code: esewaConfig.merchantId,
    });

    return res.status(200).json({
      success: true,

      payment: {
        payment_url: esewaConfig.paymentUrl,

        amount,

        tax_amount,

        total_amount,

        transaction_uuid: transactionUUID,

        product_code: esewaConfig.merchantId,

        product_service_charge,

        product_delivery_charge,

        success_url: esewaConfig.successUrl,

        failure_url: `${esewaConfig.failureUrl}?transaction_uuid=${transactionUUID}`,

        signed_field_names,

        signature,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ==========================================
// Payment Success
// ==========================================
const paymentSuccess = async (req, res) => {
  try {
    const { data } = req.query;

    if (!data) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment response.",
      });
    }

    // Decode the Base64 data sent by eSewa
    const decodedData = JSON.parse(
      Buffer.from(data, "base64").toString("utf8")
    );

    // Extract required values
    const productCode = decodedData.product_code;
    const totalAmount = decodedData.total_amount;
    const transactionUuid = decodedData.transaction_uuid;

    // Verify payment with eSewa
    const verification = await verifyPayment(
      productCode,
      totalAmount,
      transactionUuid
    );

    // Check payment status returned by eSewa
    if (verification.status !== "COMPLETE") {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed.",
      });
    }

    // Find transaction in YOUR database
    const transaction = await Transaction.findById(transactionUuid);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: "Transaction not found.",
      });
    }

    // Update transaction status
    transaction.status = "COMPLETED";
    await transaction.save();

    // Find related booking
    const booking = await Booking.findOne({
      transaction: transaction._id,
    });

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    // Update booking status
    booking.bookingStatus = "Booked";
    await booking.save();

    // Redirect user back to React
    return res.redirect(
      `http://localhost:5180/user/my-bookings/paid`
    );

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ==========================================
// Payment Failure
// ==========================================
const paymentFailure = async (req, res) => {
  try {

      

    const { transaction_uuid } = req.query;

    if (transaction_uuid) {
      const transaction = await Transaction.findById(transaction_uuid);

      if (transaction) {
        transaction.status = "FAILED";
        await transaction.save();

        // Find related booking
        const booking = await Booking.findOne({
          transaction: transaction._id,
        });

        if (booking) {
          booking.bookingStatus = "Cancelled";
          await booking.save();
        }
      }
    }

    return res.redirect("http://localhost:5180/payment/failed");
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Check Payment Status
// ==========================================
const checkPaymentStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId)
      .populate("transaction");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    }

    return res.status(200).json({
      success: true,
      bookingStatus: booking.bookingStatus,
      transactionStatus: booking.transaction.status,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================================
// Export Controllers
// ==========================================
module.exports = {
  initiatePayment,
  paymentSuccess,
  paymentFailure,
  checkPaymentStatus,
};