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

const Signup = new mongoose.model("Signup",employeeSchema);
module.exports= Signup;