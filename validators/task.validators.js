const  Joi = require('joi');

const taskValidation = Joi.object({
    task: Joi.string().required(),
    description: Joi.string().required(),
    Comments: Joi.string(),
    assigned_to: Joi.string(),
    created_by: Joi.string().required(),
    status: Joi.string().required(),
    priority: Joi.string().required(),
    startDate:Joi.date().required(),
    endDate: Joi.date().required()
    
})
module.exports= { taskValidation}