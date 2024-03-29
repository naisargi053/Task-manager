const  Joi = require('joi');

const userValidations = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required(),
    mobile_no: Joi.number().required().min(1000000000).max(9999999999),
    dob: Joi.date().required(),
    password: Joi.string().required(),
})
module.exports= {userValidations}