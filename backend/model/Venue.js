const mongoose = require("mongoose");
const Category = require("./VenueCategory.js");
const venueSchema = new mongoose.Schema({
   name:{
        type:String,
        min:2,
        max:50,
        required:true
    },
    slug:{
        type:String,
        unique:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stockQuantity:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["active", "inactive"],
        default:"inactive"
    },
    images:{
        type:String,
        required:true
    }
    
}, {
    timestamps:true,
    autoCreate:true,
    autoIndex:true
    
  
});

module.exports = mongoose.model("Venue", venueSchema);