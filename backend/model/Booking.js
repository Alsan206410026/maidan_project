const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
{
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue",
        required:true
    },

    slot:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"TimeSlot",
        required:true
    },

    bookingDate:{
        type:Date,
        required:true
    },

    totalAmount:Number,

    paymentMethod:{
        type:String,
        enum:["eSewa","Cash"],
        default:"eSewa"
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid","Refunded","Failed"],
        default:"Pending"
    },

    cancelledBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    cancellationReason:{
        type:String
    },

    bookingStatus:{
        type:String,
        enum:[
            "Pending",
            "Confirmed",
            "Cancelled",
            "Completed"
        ],
        default:"Pending"
    },

    transactionId:String

},
{
    timestamps:true
});

module.exports = mongoose.model("Booking",BookingSchema);