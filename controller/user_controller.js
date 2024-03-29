const userModel = require ('../models/user_model')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { userValidations } = require('../validators/user.validators');

exports.createUser = async (req,res) =>{

   try {
    const payload = req.body;

    //<= Check validation =>
    const{error} =userValidations.validate(payload)
    if(error){
        return res.status(500).json({
            message: "wrong validators",
            errors:error
        })
    }

    var salt = await bcrypt.genSalt(10);
    var hashedPassword = bcrypt.hashSync(payload.password,salt)
    payload.password = hashedPassword;
    
    const user = await userModel.create(payload)
    return res.status(200).send({
        success : true,
        user
    })
   } catch (error) {
    console.log(error,'error')
     return res.status(500).send({
        status: false,
        message : "Internal server error"
     })
   }
}
exports.getUser = async(req,res) =>{
    
    try {
        

        const user = await userModel.find()
        return res.status(200).send({
            status:true,
            user
        })
        
    } catch (error) {
        
        return res.status(500).send({
            status:false,
            message:"user not found"
        })
    }
}

exports.loginUser= async(req,res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await userModel.findOne( { email: email } )      
        
        if(!user){
            return res.status(400).json({
                message: "User not found!!"
            })
        }

        console.log(password, user.password);

        if(await bcrypt.compare(password, user.password)){

            console.log("token")

            const accessToken = jwt.sign( { user: user} , process.env.SECRET_TOKEN, { expiresIn: "12h" });

            return res.status(200).json({
                data: accessToken,
            })
        }

        return res.status(400).json({
            message: "email or password doent match try again."
        })
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async(req,res) =>{
    try{
    let user = await userModel.findById(req.params.id);
    console.log(user,"user")
    if(!user){
        return res.status(200).send({status:false, message:"please provide correct Id"})
    }
    user = await userModel.findByIdAndUpdate(req.params.id,req.body,{
        new :true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        status : true,
        user
    }) ;
}
      catch(error)  {
        console.log(error)
        return res.status(500).send({status: false, message: "internal server error"})
      }
 
}
exports.deleteUser = async (req, res) => {
   try {
    let user = await userModel.findById(req.params.id)
    if (!user) {
      return res
        .status(200)
        .json({ status: false, message: "please provide correct id" });
    }
  
    user = await userModel.findByIdAndDelete(req.params.body)
  
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