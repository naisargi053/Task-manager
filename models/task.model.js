const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    task:{
        type: String,
        require:true,
        trim:true
    },
    description:{
        type: String,
        require: true,
        trim: true
    },
    Comments:{
        type:String
        
    },
    assigned_to:{
        ref:"User",
        type:mongoose.Schema.Types.ObjectId,
        require: true
    },
    created_by:{
        ref:"User",
         type:mongoose.Schema.Types.ObjectId,
         require: true

    },
    status:{
        type: String,
        enum :["completed","pending"]
    },
    priority:{
        type: String,
        emum :["high","low","medium"]
    },
    startDate:{
        type: Date,
        require: true
    },
    endDate:{
        type: Date,
        require: true
    }

})
module.exports = mongoose.model("Task",taskSchema)