const express = require ('express')
const { createUser,getUser,loginUser,updateUser,deleteUser} = require ("../controller/user_controller")
const {isAuthenticateUser} = require("../middleware/authenticate_user")

const router = express.Router();

router.route("/create-user").post(createUser)
router.route("/get-user").get(isAuthenticateUser,getUser)
router.route("/login-user").get(loginUser)
router.route("/update-user/:id").put(isAuthenticateUser,updateUser)
router.route("/delete-user/:id").delete(isAuthenticateUser,deleteUser)
module.exports = router
