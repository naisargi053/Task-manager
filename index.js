const express = require('express')
const app= express()
const dotenv = require("dotenv")
dotenv.config()
const {db} = require("./config/db")
const user = require("./routes/user_route")
const task = require("./routes/task_route")
const comment = require("./routes/comment_route")
const cors = require("cors")
PORT = 5000
app.use(express.json())


//middleware
const corsOption ={
    origin:['*'],
    Credential: true,
};

app.use(cors(corsOption))          

app.use("/api/v1",user)
app.use("/api/v1",task)
app.use("/api/v1",comment)

app.listen(PORT,() =>{
    db()
    console.log(`listerning on http://localhost:${PORT}`)
})

