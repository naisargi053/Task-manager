const commentModel  = require("../models/comment.model")

exports.createComment = async(req,res) =>{

    try {
        const commnent = (await commentModel.create(req.body))
        return res.status(200).send({
            sucess: true,
            commnent
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            status:false,
            message:"Internal server error"
        })
    }
}

exports.getComment = async(req,res) =>{

    try {
        const comment = await commentModel.find()
        .populate({
            path:"task",
            select:["task","description","status"]
        })
        .populate({
            path:"commenteBy",
            select:["name","email","mobile_no"]
        })
        return res.status(200).send({
            status: true,
            comment
        })
        
    } catch (error) {
        return res.status(500).send({
            status:false,
            message:("Internal server error")
        })
    }
}
exports.updateComment = async(req,res) =>{

    try{

    let comment = await commentModel.findById(req.params.id);
    console.log(comment,"comment")
    if(!comment){
        return res.status(200).send({status:false, message:"please provide correct comment Id"})
    }
    userComment = await commentModel.findByIdAndUpdate(req.params.id,req.body,{
        new :true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        status : true,
        userComment
    });
}
      catch(error)  {
        console.log(error)
        return res.status(500).send({status: false, message: " data is not updated "})
      }
 
}
exports.deleteComment = async (req, res) => {
    try {
     let comment = await commentModel.findById(req.params.id)
     if (!comment) {
       return res
         .status(200)
         .json({ status: false, message: "please provide correct id" });
     }
   
     deluser = await commentModel.findByIdAndDelete(req.params.body)
   
     res.status(200).json({
       status: true,
       message: "Delete sucessfully",
     });
     
    } catch (error) {
     console.log(error,"error")
     return res.status(500).send({
         status:false,
         message:"Internal server error"
     })
     
    }
   };