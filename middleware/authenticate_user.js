const jwt = require("jsonwebtoken")
const authenticateUser = require("../models/user_model")
require('dotenv').config();

//Middleware to verify JWT token
const isAuthenticateUser = async(req,res,next) =>{
    try {
        const token = req.headers.authorization;

        if(!token){
            //Handle missing token
            return res.status(403).send({
                success: false,
                message: 'please login to access this resorce'
            })
        }
        try {
            const decodedData = jwt.verify(token.split(' ')[1], process.env.SECRET_TOKEN)
            console.log(decodedData,'decodedData')

            req.user = decodedData;
            next();
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Invalid token'
            })
            
        }
        
    } catch (error) {
        next(error)
    }
};
module.exports = { isAuthenticateUser };