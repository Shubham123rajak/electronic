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
    mobileNo:{
       type:Number,
       require:true
    },
    service: {
        type: String, 
        require: true
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
    email:{
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require: true,
        
    },
    confirmpassword:{
        type:String,
        require: true,
    }

})

const Register = new mongoose.model("Register",employeeSchema);
module.exports= Register;