const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name:{
        type : String,
        require :true,
        trim: true
    },
    email:{
        type: String,
        require: true,
        unique: [true, "Email Already Exist"],
        trim: true,
    },
    mobile_no:{
        type: Number,
        require: true,
        unique: [true, "User Already Exist"],
        trim: true
    },
    dob:{
        type: Date,
        require: true
    },
    password:{
        type: String,
        require: true,
        trim: true
    }
    
},{
    timestamps: true,
})


module.exports = mongoose.model("User",userSchema)