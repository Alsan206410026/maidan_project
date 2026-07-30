const mongoose = require("mongoose");

const TimeSlotSchema = new mongoose.Schema(
{
    venue:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Venue",
        required:true
    },

    day:{
        type:String,
        enum:[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
        ],
        required:true
    },

    startTime:{
        type:String,
        required:true
    },

    endTime:{
        type:String,
        required:true
    },

    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("TimeSlot", TimeSlotSchema);