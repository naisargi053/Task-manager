const express = require ('express')
const { createTask,getTask,updateTask,deleteTask,updateTaskStatus } = require ("../controller/task_controller")
const {isAuthenticateUser} = require("../middleware/authenticate_user")

const router = express.Router();

router.route("/create-task").post(isAuthenticateUser,createTask)
router.route("/get-task").get(isAuthenticateUser,getTask)
router.route("/update-task/:id").put(isAuthenticateUser,updateTask)
router.route("/status-update/:id").put(updateTaskStatus)
router.route("/delete-task/:id").delete(isAuthenticateUser,deleteTask)

module.exports = router
