const userModel=require("../models/user.model.js")
const userService=require("../services/user.services.js")
const {validationResult}=require("express-validator")

module.exports.registerUser=async(req,res,next)=>{
 const errors=validationResult(req);

 if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})

 }

 console.log(req.body);
 const {fullname,email,password}=req.body;

 const hashPassword=await userModel.hashPassword(password);

 const user=await userService.createUser({
    firstname:fullname.firstname,
    lastname:fullname.lastname,
    email,
    password:hashPassword
 });

  const token =user.generateAuthToken();
  res.status(201).json({token,user});

}

module.exports.loginUser=async(req,res,next)=>{
 const errors=validationResult(req);
 const {email,password}=req.body;
   
 if(!email || !password){
   return res.status(400).json({errors:errors.array()})
 }


const user=await userModel.findOne({email}).select('+password')

if(!user){
   return res.status(401).json({message:"invalid email or password"})
}
const isMatch=await user.comparePassword(password)

if(!isMatch){
   return res.status(401).json({message:"invalid email or password"})
}

const token =user.generateAuthToken();

return res.status(200).json({token,user});

}