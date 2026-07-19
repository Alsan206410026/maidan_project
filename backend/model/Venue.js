const mongoose = require("mongoose");
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
    status:{
        type:String,
        enum:["Open","Closed"],
        required:true
    },
    
    images:{
        type:String,
        required:true
    },
    
    location:{
        type:String,
        required:true
    },
    admin:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    }
    
}, {
    timestamps:true,
    autoCreate:true,
    autoIndex:true
    
  
});

module.exports = mongoose.model("Venue", venueSchema);