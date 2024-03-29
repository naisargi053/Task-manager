const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    message:[{
        type: String,
        require:true,
        trim:true
    }],
    
    task:{
        ref:"Task",
        type:mongoose.Schema.Types.ObjectId,
        require: true
    },
    commenteBy:{
        ref:"User",
         type:mongoose.Schema.Types.ObjectId,
         require: true

    }
   

})
module.exports = mongoose.model("Comment",CommentSchema)
