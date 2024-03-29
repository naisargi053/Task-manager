const mongoose =  require('mongoose')

exports.db = async() =>{

    try {
        
        await mongoose.connect(process.env.MONGO_DB)
        console.log("Database Connection sucessfully")
    } catch (error) {
        
        console.log("Datbase connection Error")
    }
}