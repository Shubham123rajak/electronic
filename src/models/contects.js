const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    firstname : {
        type:String,
        require:true
    },
    lastname : {
        type : String,
        require: true
    },
    email:{
        type:String,
        require: true,
        unique: true
    },
    mobileNo:{
       type:Number,
       require:true
    },
    
    

    address: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },

    pincode: {
        type: Number,
        required: true
    },
    
    
    date:{
        type:Date,
        require: true

    },
    ftime:{
        type:String,
        require: true

    },
    ttime:{
        type:String,
        require: true

    },


    comment:{
        type:String,
        require: true,
        
    },
    video:{
        type:String,
        require: true,
    }

})

const Contect = new mongoose.model("Contect",employeeSchema);
module.exports= Contect;