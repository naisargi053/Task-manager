const express = require("express")
const {createComment,getComment,updateComment,deleteComment} = require("../controller/comment_controller")
const {isAuthenticateUser} = require("../middleware/authenticate_user")

const router = express.Router();

router.route("/create-comments").post(isAuthenticateUser,createComment)
router.route("/get-comments").get(isAuthenticateUser,getComment)
router.route("/update-comments/:id").put(isAuthenticateUser,updateComment)
router.route("/delete-comment/:id").delete(isAuthenticateUser,deleteComment)

module.exports = router