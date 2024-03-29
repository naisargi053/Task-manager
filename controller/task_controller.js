const { object } = require("joi");
const taskModel = require("../models/task.model")

const { taskValidation } = require('../validators/task.validators');

exports.createTask = async(req,res) =>{

   try {
        const payload = req.body;
        payload.created_by = req.user.user._id;

     const{error} = taskValidation.validate(payload)

    if(error){
        return res.status(500).json({
            message: "wrong validators",
            errors:error
        })
    }
    const task = await taskModel.create(payload)
    return res.status(200).send({
        succes:true,
        task
    })
   } catch (error) {
    console.log(error,"error")
    return res.status(500).send({
        status:false,
        message:("Internal server error")
    })
   }
}

exports.getTask = async(req,res) =>{
    const page = parseInt (req.query.page) || 1
    const limit= parseInt(req.query.limit) || 10
    const skip =(page-1)*limit;
    const status = req.query.status
    const priority = req.query.priority
    const sortBy = req.query.sortBy
    const sortOrder = req.query.sortOrder
    const search = req.query.searchTerm
    try {
        const filter ={};
        const sort ={[sortBy]:sortOrder}
        if(status,priority) {
            filter.status = status;
            filter.priority =priority;

        }
        if(search){
            filter.search = {$regex: new RegExp(search, "i")}
        }
        const task = await taskModel.find(filter).skip(skip).limit(limit).sort(sort).populate({
            path:"assigned_to",
            select:["name","email","mobile_no"]
        }).populate({
            path:"created_by",
            select:["name","email","mobile_no"]

        })
        console.log(task, 'task')
        const totalTask = await taskModel.countDocuments();
        
    if (!task.length) {
        return res.status(200).json({ status: false, message: "no data found" });
      }

        return res.status(200).send({
            status:true,
            task,totalTask
        })
     
       } catch (error) {
        console.log(error,"error")
        return res.status(500).send({
            status:false,
            message:("Task not created")
        })
       }
}

exports.updateTask = async(req,res) =>{

    try{

    let task = await taskModel.findById(req.params.id);
    console.log(task,"task")
    if(!task){
        return res.status(200).send({status:false, message:"please provide correct task Id "})
    }
    task = await taskModel.findByIdAndUpdate(req.params.id,req.body,{
        new :true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).send({
        status : true,
       task
    }) 
}
      catch(error)  {
        console.log(error)
        return res.status(500).send({status: false, message: " data is not updated "})
      }
 
}
exports.deleteTask = async (req, res) => {
    try {
     let task = await taskModel.findById(req.params.id)
     if (!task) {
       return res
         .status(200)
         .json({ status: false, message: "please provide correct id" });
     }
   
     user = await taskModel.findByIdAndDelete(req.params.body)
   
     res.status(200).json({
       status: true,
       message: "Delete sucessfully",
     });
     
    } catch (error) {
     console.log(error,"error")
     return res.status(500).send({
         status:false,
         message:"Task not deleted "
     })
     
    }
};

exports.updateTaskStatus = async (req, res) => {
    try {
        
        const taskId = req.params.id;
        const { status, ...otherFields } = req.body;

        // Check if there are other fields in the request body
        if (Object.keys(otherFields).length > 0) {
            return res.status(400).json({ status: false, message: "You can only update the status field" });
        }

        // Find the task by ID
        let task = await taskModel.findById(taskId);

        // If task not found, return an error response
        if (!task) {
            return res.status(404).json({ success: false, message: "Task not found" });
        }

        // Update only the status field
        task.status = status;

        // Save the updated task
        await task.save();

        // Return success response
        return res.status(200).json({ success: true, message: "Task status updated successfully", task });
    } catch (error) {
        // Handle errors
        console.error("Error updating task status:", error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};