const express=require("express");
const router=express.Router();

const {body}=require("express-validator");
const userController=require("../controllers/user.controller")


router.post("/register",[
    body('email').isEmail().withMessage("invlaid email"),
    body('fullname.firstname').isLength({min:3}).withMessage('first name should be least 3 words long'),
    body('password').isLength({min:6}).withMessage("password must be 6 letters")
],

  userController.registerUser
)

module.exports=router;